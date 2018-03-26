module.exports =  {
    // url: 'https://demo-publisher.xsolla.com',
    url: 'https://test-demo-merchant.xsolla.com',
    // webdriver_server_url: 'http://localhost:4444/wd/hub/',
    webdriver_server_url: 'http://seleniumgrid.srv.local:4444/wd/hub/',
    cooldown: 0,
    inCommandCooldown: 500,
    antiStaleCooldown: 500,
    retryCommandCooldown: 500,
    waitCooldown: 30000,
    retry_test_count: 2,
    retry_command_count: 3,
    reporter_options: {
        "mocha-allure-reporter": "-",
        spec: "-"
    },
    mocha_timeout: 120000,
    browser: 'chrome',
    options: {
        chrome: [
            'window-size=1920,1045',
            // 'headless',
            // 'disable-gpu',
        ]
    }
};