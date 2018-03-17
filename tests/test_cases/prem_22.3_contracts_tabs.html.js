
module.exports = async function (config, test_prep_file) {
    const helpers = require('../../configs/utils/helpers');
    const mask_list = require('../../configs/utils/mask_list');
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


const clickByCoordinates = `
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });
    var el = document.elementFromPoint(x, y);
    el.dispatchEvent(ev);
`;

    let previous_year_date = moment().add(-1, 'years').add(1, 'days').startOf('day').toDate();
    let text_vars = {};
    let element;
    let stepName = '0 init test';
    let last_elem_text = '';
    let vars = {};

    const options = new chrome.Options();
    if (os.platform().indexOf('linux') !== -1) {
        options.addArguments('headless');
        options.addArguments('disable-gpu');
    }
    options.addArguments('window-size=1920,1045');
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
            
            
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `1
						command: open
						target: /contracts
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.sleep(inCommandCooldown);
		await driver.get(baseUrl+`/contracts`);
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `2
						command: //
						target: 
						value: очистка`;
						allure.createStep(step,()=>{})();
						});

        			await driver.sleep(inCommandCooldown);
		await console.log('        (i) очистка');
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `3
						command: click
						target: id=clean
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.wait(until.elementLocated(By.id(`clean`)), waitCooldown);
        			element = await driver.wait(until.elementLocated(By.id(`clean`)), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});
 					await driver.executeScript(scrollElementIntoMiddle, element);
        			await driver.sleep(inCommandCooldown);
		
					await driver.wait(until.elementLocated(By.id(`clean`)),waitCooldown).click();
					 
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `4
						command: type
						target: //*[@data-id="contracts_periodFrom_input"]
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_periodFrom_input"]`)), waitCooldown);
        			element = await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_periodFrom_input"]`)), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});
 					await driver.executeScript(scrollElementIntoMiddle, element);
        			await driver.sleep(inCommandCooldown);
		
					let inputElement = await driver.wait(until.elementLocated(By.xath(`//*[@data-id="contracts_periodFrom_input"]`)),waitCooldown);
					await inputElement.clear();
            		await inputElement.sendKeys(String.raw``);
            		let inputText = await inputElement.getAttribute("value");
            		let inputText2 = await inputElement.getText();
            		await assert.ok('' == inputText || ''  == inputText2);
            		
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `5
						command: type
						target: //*[@data-id="contracts_periodTo_input"]
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_periodTo_input"]`)), waitCooldown);
        			element = await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_periodTo_input"]`)), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});
 					await driver.executeScript(scrollElementIntoMiddle, element);
        			await driver.sleep(inCommandCooldown);
		
					let inputElement = await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_periodTo_input"]`)),waitCooldown);
					await inputElement.clear();
            		await inputElement.sendKeys(String.raw``);
            		let inputText = await inputElement.getAttribute("value");
            		let inputText2 = await inputElement.getText();
            		await assert.ok('' == inputText || ''  == inputText2);
            		
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `6
						command: click
						target: //*[@data-id="contracts_contractStatusStopped_checkbox"]
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusStopped_checkbox"]`)), waitCooldown);
        			element = await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusStopped_checkbox"]`)), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});
 					await driver.executeScript(scrollElementIntoMiddle, element);
        			await driver.sleep(inCommandCooldown);
		
					await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusStopped_checkbox"]`)),waitCooldown).click();
					 
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
					await driver.sleep(0).then(()=>{
						step = `7
						command: click
						target: //*[@data-id="contracts_contractStatusCancel_checkbox"]
						value: `;
						allure.createStep(step,()=>{})();
						});

        			await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusCancel_checkbox"]`)), waitCooldown);
        			element = await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusCancel_checkbox"]`)), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});
 					await driver.executeScript(scrollElementIntoMiddle, element);
        			await driver.sleep(inCommandCooldown);
		
					await driver.wait(until.elementLocated(By.xpath(`//*[@data-id="contracts_contractStatusCancel_checkbox"]`)),waitCooldown).click();
					 
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        
            
            await driver.sleep(5000);
await driver.quit();
        return await 'ok'
    } catch (err) {
        return await catcherror(err)
    }
};
