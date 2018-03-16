const Mocha = require('mocha');
module.exports = function mochaInit(testSuit, config) {
    global.libse = {
        testSuit: testSuit,
        config: config
    };

    let reporterOptions = {
        "mocha-allure-reporter": "-",
        spec: "-"
    };

    let mocha = new Mocha({
        reporter: "mocha-multi",
        reporterOptions: reporterOptions,
        timeout: 1200000
    });
    mocha.fullTrace();
    mocha.addFile('./newproject/libse/testSuitInit.js');

    mocha.run(function onRun(failures) {
        console.log(failures);
    });
};