module.exports =  {
    url: 'https://demo-publisher.xsolla.com',
    webdriver_server_url: 'http://localhost:4444/wd/hub/',
    cooldown: 0,
    inCommandCooldown: 0,
    antiStaleCooldown: 500,
    retryCommandCooldown: 500,
    waitCooldown: 12000,
    retry_test_count: 1,
    retry_command_count: 1,
    reporter_options: {
        "mocha-allure-reporter": "-",
        spec: "-"
    },
    mocha_timeout: 1200000,
    browser: 'chrome',
    options: {
        chrome: [
            'window-size=1920,1045',
            // 'headless',
            // 'disable-gpu',
        ]
    }
};