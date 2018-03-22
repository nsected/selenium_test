//Обработчик тест-кейсов. Запускает выполнение тест-кейса, ретраит кейс, коллектит ошибки и отправляет их в аллют отчет

const Libse = require('./libse');
const {URL} = require('url');

module.exports = async function testCaseExecutor(testCase, config, done) {
    process.on('unhandledRejection', (error) => {
        console.log('unhandledRejection');
        allure.createStep(' ❌ error: '+ error.name, () => {})();
        throw error;
    });
    let libse;
    let iteration = 1;
    config.href = new URL(config.url).origin;

    console.log('    ▷ test ' + testCase.name + ' started');

    async function test() {
        try {
            libse = await new Libse(config);

            for (let script of testCase.scripts) {
                await script(config, done, libse);
            }

            await libse.driver.close();
            await done()
        } catch (error) {
            console.log(error.step);
            errorHandler(error)
        }
    }

    async function errorHandler(error) {
        if (iteration < config.retry_test_count) {
            iteration++;
            console.log('↻ retrying test ' + testCase.name + ' try ' + iteration);
            try {
                await libse.driver.quit();
            } catch (e) {
                return true
            }


            test();


        } else {
            let step;
            let url;
            let driverScreenData = [];
            let screenShot;


            try {
                libse.driver.getCurrentUrl()
                    .then(_url => {
                        url = _url;
                        return libse.driver.takeScreenshot()
                    })
                    .then(_driverScreenData => {
                        driverScreenData = _driverScreenData;
                        return libse.driver.quit()
                    })
                    .then(driver=>{
                        returnErrorToMocha(error);
                    })
                    .catch(error=>{
                        setTimeout(()=>{returnErrorToMocha(error)}, 3000);
                    });
                step = error.step;

            } catch (e) {
                setTimeout(()=>{returnErrorToMocha(error)}, 3000);
            }



            function returnErrorToMocha() {
                console.error(' ❌ ' + testCase.name + ' fail');
                console.error('at step ' + step);
                console.error('url: ' + url);

                allure.description(
                    'Ошибка на шаге: ' + step
                    + '\nАдрес: ' + url,
                    'markdown'
                );

                if (driverScreenData.length > 0){
                    screenShot = new Buffer(
                        driverScreenData,
                        "base64"
                    );

                    allure.createAttachment(
                        "error screen " + testCase.name,
                        screenShot
                    );
                }
                allure.createStep(' ❌ error: '+ error.name, () => {})();
                done(error);
            }


        }
    }

    await test();
};