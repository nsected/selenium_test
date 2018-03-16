const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('window-size=1920,1045');

module.exports =  async function (config) {
    return await new webdriver.Builder()
        .forBrowser(config.browser)
        .setAlertBehavior('accept')
        .withCapabilities(options)
        .usingServer('http://localhost:4444/wd/hub/')
        .build();
};