const testCaseExecutor = require('./testCaseExecutor');

const testSuit = global.libse.testSuit;
const config = global.libse.config;

describe(
    testSuit.name,
    () => {
        testSuit.cases.forEach((testCase) => {
            it(
                testCase.name,
                done => {
                    testCaseExecutor(testCase, config, done);
                }
            )
        })
    }
);
