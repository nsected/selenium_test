const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('window-size=1920,1045');

module.exports = async function (config) {
    return driver = await new webdriver.Builder()
        .forBrowser(config.browser)
        .setAlertBehavior('accept')
        .withCapabilities(options)
        .build();
};