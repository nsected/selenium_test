//кастомные команды для тестов, в дополнение к selenium командам
module.exports =  class Commands {
    constructor() {
    }

    async open(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     open');
                await this.executeCommand(
                    async () => {
                        await this.driver.get(this.config.url + target);
                        await resolve(this)
                    },
                    'open',
                    target,
                    '-',
                    reject
                );
        }).catch((err)=>{
            this.catcherror(err, 'open', target, '-',)
        })

    }

    async click(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     click');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);

                    let elem = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown)
                        .then(elem=>{return this.driver.wait(this.until.elementIsEnabled(elem), this.waitCooldown)});
                    await this.driver.executeScript(this.scrollElementIntoMiddle, elem);

                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown).click();
                    await resolve(elem)
                },
                'click',
                target,
                '-',
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'click', target, '-',)
        })
    }

    async type(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('     type');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);

                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown)
                        .then(elem=>{return this.driver.wait(this.until.elementIsEnabled(elem), this.waitCooldown)});

                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown).click();

                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.executeScript(this.scrollElementIntoMiddle, inputElement);
                    await inputElement.clear();
                    await inputElement.sendKeys(value);
                    let elementValue = await inputElement.getAttribute("value");
                    let elementText = await inputElement.getText();
                    await this.assert.ok(value == elementValue || value == elementText);
                    await resolve(inputElement)
                },
                'type',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'type', target, value,)
        })
    }

    async waitForPresent(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     waitForPresent');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let element = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await resolve(element)
                },
                'waitForPresent',
                target,
                '-',
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'waitForPresent', target, '',)
        })
    }

    async sleep(value) {
        return new Promise(async (resolve, reject) => {
            await console.log('     sleep');
            await this.executeCommand(
                async () => {
                    await this.driver.sleep(value);
                    await resolve(this)
                },
                'sleep',
                '-',
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'sleep', '-', value,)
        })
    }

    async waitForVisible(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     waitForVisible');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.findElement(target);
                    let element = await this.driver.wait(this.until.elementIsVisible(target), this.waitCooldown);
                    await resolve(element)
                },
                'waitForVisible',
                '-',
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'waitForVisible', '-', value,)
        })
    }

    async assertText(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('     assertText');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let elementValue = await inputElement.getAttribute("value");
                    let elementText = await inputElement.getText();
                    // console.log(value);
                    // console.log(elementValue);
                    console.log(elementText);
                    await this.driver.executeScript(this.scrollElementIntoMiddle, inputElement);
                    await this.assert.ok(elementValue == value || elementText == value);
                    await resolve(inputElement)
                },
                'assertText',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'assertText', target, value,)
        })
    }

    async verifyText(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('     verifyText');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let elementValue = await inputElement.getAttribute("value");
                    let elementText = await inputElement.getText();
                    // await console.log(value);
                    // await console.log(elementValue);
                    await console.log(elementText);
                    await this.driver.executeScript(this.scrollElementIntoMiddle, inputElement);
                    await this.assert.ok(new RegExp(value).test(elementValue) || new RegExp(value).test(elementText));
                    await resolve(inputElement)
                },
                'verifyText',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'verifyText', target, value,)
        })
    }

    async waitForTextMatch(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('     waitForTextMatch');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    let element = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await this.driver.sleep(this.antiStaleCooldown);
                    await this.driver.executeScript(this.scrollElementIntoMiddle, element);
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown)
                        .then(elem=>{return this.driver.wait(this.until.elementTextMatches(elem, new RegExp(value)), this.waitCooldown)});
                    await resolve(element)
                },
                'waitForTextMatch',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'waitForTextMatch', target, value,)
        })
    }

    async getElement(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     verifyText');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let elementValue = await inputElement.getAttribute("value");
                    let elementText = await inputElement.getText();
                    inputElement.elementValue = elementValue;
                    inputElement.elementText = elementText;
                    await resolve(inputElement)
                },
                'verifyText',
                target,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'verifyText', target,)
        })
    }

    async getDate(target) {
        return new Promise(async (resolve, reject) => {
            await console.log('     verifyText');
            await this.executeCommand(
                async () => {
                    await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    let elementValue = await inputElement.getAttribute("value");
                    let elementText = await inputElement.getText();
                    let elementDate = await this.parse_date(elementText || elementValue);
                    await resolve(elementDate)
                },
                'verifyText',
                target,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'verifyText', target,)
        })
    }



};