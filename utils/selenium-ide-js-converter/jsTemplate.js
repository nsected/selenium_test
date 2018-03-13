const config=require('./config'),
{configLocation}=config;

module.exports=`
module.exports = async function (config, test_prep_file) {
    const helpers = require('../utils/helpers');
    const mask_list = require('../utils/mask_list');
    const webdriver = require('selenium-webdriver');
    const By = require('selenium-webdriver').By;
    const until = require('selenium-webdriver').until;
    const assert = require('assert');
    const chrono = require('chrono-node');
    const os = require('os');
    const Key = require('selenium-webdriver').Key;
    const chrome = require('selenium-webdriver/chrome');
    const moment = require('moment');

    const sorting = helpers.sorting;
    const get_elem_date = helpers.get_elem_date;
    const scrollElementIntoMiddle = helpers.scroll_element_into_middle;
    const regexp_test = helpers.regexp_test;

    const cooldown = config.cooldown;
    const inCommandCooldown = config.inCommandCooldown;
    const retryCommandCooldown = config.retryCommandCooldown;
    const waitCooldown = config.waitCooldown;
    const baseUrl = config.href;
    const retry_command_count = config.retry_command_count;
    const options = new chrome.Options();

const clickByCoordinates = \`
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });
    var el = document.elementFromPoint(x, y);
    el.dispatchEvent(ev);
\`;

    let previous_year_date = moment().add(-1, 'years').add(1, 'days').startOf('day').toDate();
    let text_vars = {};
    let element;
    let stepName = '0 init test';
    let last_elem_text = '';
    let vars = {};

    options.addArguments('window-size=1920,1045');
    if (os.platform().indexOf('linux') !== -1) {
        options.addArguments('headless');
        options.addArguments('disable-gpu');
    }

    const driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setAlertBehavior('accept')
        .withCapabilities(options)
        .build();
      
     function catcherror(err) {
        let data = {};
        data.step = step;
        data.err = err;
        data.driver = driver;
        return data
    }

    function parse_date(date_string) {
        let clear_date_string = chrono.parse(date_string)[0].text;
        return moment(clear_date_string, 'DD.MM.YYYY').toDate();
    }

    try {
        await driver.get(config.url).catch(err => {
            throw(err);
        });

        await require(test_prep_file)(driver, By, until, baseUrl, cooldown, waitCooldown);       
            
            {-actions-}
            
            await driver.sleep(5000);
await driver.quit();
        return await 'ok'
    } catch (err) {
        return await catcherror(err)
    }
};
`;