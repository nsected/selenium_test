//билдер селениум-вебдрайвера

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();

module.exports =  async function (config) {
    config.options[config.browser].forEach(option=>{
        options.addArguments(option);
    });

    return await new webdriver.Builder()
        .forBrowser(config.browser)
        .setAlertBehavior('accept')
        .withCapabilities(options)
        .usingServer(config.webdriver_server_url)
        .build();
};