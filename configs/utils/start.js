const Mocha = require('mocha');
const testFile = process.argv[2];
let reporterOptions = {
    "mocha-allure-reporter": "-",
    spec: "-"
};

let mocha = new Mocha({
    reporter: "mocha-multi",
    reporterOptions: reporterOptions,
    timeout: 1200000
});
mocha.addFile(testFile);
mocha.run(function onRun(failures){
    console.log(failures);
});