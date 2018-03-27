module.exports =  {
    url: 'https://demo-publisher.xsolla.com',
    webdriver_server_url: 'http://seleniumgrid.srv.local:4444/wd/hub/',
    cooldown: 0,
    inCommandCooldown: 0,
    antiStaleCooldown: 0,
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
            '--ignore-certificate-errors',
            '--disable-popup-blocking',
            // 'headless',
            // 'disable-gpu',
        ]
    }
};