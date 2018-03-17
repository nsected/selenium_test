const Libse = require('./libse');
const {URL} = require('url');

module.exports = async function testCaseExecutor(testCase, config, done) {
    process.on('unhandledRejection', (error) => {
        console.log('unhandledRejection');
        allure.createStep(' ❌ error: '+ error.name, () => {})();
        throw error;
    });
    let iteration = 1;
    config.href = new URL(config.url).origin;

    console.log('    ▷ test ' + testCase.name + ' started');

    async function test() {
        try {
            let libse = await new Libse(config);

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
                await error.driver.quit();
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
                error.driver.getCurrentUrl()
                    .then(_url => {
                        url = _url;
                        return error.driver.takeScreenshot()
                    })
                    .then(_driverScreenData => {
                        driverScreenData = _driverScreenData;
                        return error.driver.quit()
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