const Libse = require('./libse');
const { URL } = require('url');

module.exports =  async function testCaseExecutor(testCase, config, done) {
    let iteration = 1;
    config.href = new URL(config.url).origin;

    console.log('    ▷ test ' + testCase.name + ' started');

    async function test() {
        try {
            await testCase.script(config, done, Libse);
            await done()
        } catch (err) {
            errorHandler(err)
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
            let step = error.step;
            let url;
            let screenShot;

            try {
                screenShot = new Buffer(
                    await error.driver.takeScreenshot(),
                    "base64"
                )
            } catch (e) {
                return true
            }
            try {
                url = await error.driver.getCurrentUrl();
            } catch (e) {
                return true
            }
            try {
                await error.driver.quit();
            } catch (e) {
                return true
            }

            console.error('❎ ' + testCase.name + ' fail');
            console.error('at step ' + step);
            console.error('url: ' + url);

            await allure.description(
                'Ошибка на шаге: ' + step
                + '\nАдрес: ' + url,
                'markdown'
            );

            await allure.createAttachment(
                "error_screen_" + testCase.name,
                screenShot
            );

            done(error);

        }
    }
    await test();
};