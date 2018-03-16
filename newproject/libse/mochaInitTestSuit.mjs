import Mocha from 'mocha';
import testCaseExecutor from './testCaseExecutor';

export default function mochaInitTestSuit(testSuit, config) {

    let reporterOptions = {
        "mocha-allure-reporter": "-",
        spec: "-"
    };

    let mocha = new Mocha({
        reporter: "mocha-multi",
        reporterOptions: reporterOptions,
        timeout: 1200000
    });

    mocha.addFile(testSuitHandler(testSuit));


    mocha.run(function onRun(failures) {
        console.log(failures);
    });


    function testSuitHandler(testSuit) {
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

    }
}