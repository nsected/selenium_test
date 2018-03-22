//Инициализатор тест-сьюта. Создает в mocha и allure новый тест-сьют,
//добавляет информацию об окружении, имена кейсов и имя тест-сьюта,
//запускает выполнение тест-кейса

const testCaseExecutor = require('./testCaseExecutor');
const os = require('os');
const testSuit = global.libse.testSuit;
const config = global.libse.config;

describe(
    testSuit.name,
    () => {

        testSuit.cases.forEach((testCase) => {
            it(
                testCase.name,
                done => {
                    allure.addArgument('Project URL', config.url);
                    Object.keys(config).forEach(function (key) {
                        allure.addEnvironment(key, JSON.stringify(config[key]));
                    });
                    allure.addEnvironment('OS', os.platform());

                    testCaseExecutor(testCase, config, done);
                }
            )
        })
    }
);
