// import testSuitInit from './testSuitInit';
let Mocha = require('mocha');
console.log(1)
console.log(process.argv);
// module.exports = function mochaInit(testSuit, config) {
    console.log(2)
    // global.env.libse.config = config;
    // global.env.libse.testSuit = testSuit;

    let reporterOptions = {
        "mocha-allure-reporter": "-",
        spec: "-"
    };

    let mocha = new Mocha({
        reporter: "mocha-multi",
        reporterOptions: reporterOptions,
        timeout: 1200000
    });

    mocha.addFile('./testSuitInit.mjs');
    console.log(1);

    mocha.run(function onRun(failures) {
        console.log(failures);
    });
// };