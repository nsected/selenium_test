//запуск тест-сьюта в Mocha

const Mocha = require('mocha');
module.exports = function mochaInit(testSuit, config) {
    global.libse = {
        testSuit: testSuit,
        config: config
    };

    let mocha = new Mocha({
        reporter: "mocha-multi",
        reporterOptions: config.reporter_options,
        timeout: config.mocha_timeout
    });
    mocha.fullTrace();
    mocha.addFile(__dirname+'/testSuitInit.js');

    mocha.run(function onRun(failures) {
        console.error(failures);
    });
};