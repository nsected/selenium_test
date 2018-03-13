const {URL} = require('url');
if (global.allure === undefined) {
    global.allure = {};
    global.allure.createAttachment = _ => {
        return _ => {
        }
    };
    global.allure.description = _ => {
        return _ => {
        }
    };
    global.allure.createStep = function (step, callback) {
        return _ => {
            callback()
        }
    };
}

module.exports =
    function test_case(test_case, done, test_prep_file) {
        let iteration = 1;
        let config = require('../configs/config');
        let handleDriver;
        let error_handler;
        let errorProcess;
        config.href = new URL(config.url).origin;

        console.log('test ' + test_case + ' started');

        async function test() {
            try {
                let result = await require('../converted_tests/' + test_case)(config, test_prep_file, done);
                await console.log(result);
                if (result.err) {
                    await errorProcess(result)
                } else {
                    await done()
                }
            } catch (err) {
                await console.log(result);
                await errorProcess({
                    type: 'unexpectedError',
                    err: err
                })
            }
        }

        errorProcess = async function (result) {
            result = errorSorting(result);
            if (result.type === 'screenableError'){
                await handleDriver(result)
            }
            error_handler(result)
        };

        function errorSorting(result) {
            if (result.type === 'driverFail') {
                return result
            }

            if (result.err.name !== 'WebDriverError' &&
                result.err.name !== 'NoSuchWindowError') {
                result.type = 'screenableError';
                return result
            } else {
                result.type = 'driverFail';
                return result
            }
        }

        handleDriver = async function (result) {
            result.url = await result.driver.getCurrentUrl();

            let screenshot = await result.driver.takeScreenshot();
            await allure.createAttachment(
                "error_screen_" + test_case,
                new Buffer(screenshot, "base64")
            );

            await allure.description(
                'Ошибка на шаге: ' + result.step
                + '\nАдрес: ' + result.url,
                'markdown'
            );
        };

        error_handler = async function (error) {
            if (iteration < config.retry_count) {
                iteration++;
                console.log('retrying test ' + test_case + ' try ' + iteration);
                console.error(test_case + ': ' + error.err.name);
                // process.exit(1);
                try {
                    await error.driver.quit();
                } catch(e) {
                    return true
                }
                test();
            } else {
                console.error('!✖❌❎🗙╳ ' + test_case + ' fail');
                console.error('at step ' + error.step);
                console.error('url: ' + error.url);
                // process.exit(1);
                try {
                    await error.driver.quit();
                } catch(e) {
                    return true
                }
                done(error.err);
            }
        };
        test();
    };
