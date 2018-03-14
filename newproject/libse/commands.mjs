export default class Commands {
    constructor() {
    }

    async open(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('open');
                await this.executeCommand(
                    async () => {
                        let elem = await this.driver.get(this.config.url + target);
                        await resolve(elem)
                    },
                    'open',
                    target,
                    value,
                    reject
                );
        }).catch((err)=>{
            this.catcherror(err, 'click', target, value,)
        })

    }

    async click(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('click');
            await this.executeCommand(
                async () => {
                    let elem = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown).click();
                    await resolve(elem)
                },
                'click',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'click', target, value,)
        })
    }

    async type(target, value) {
        return new Promise(async (resolve, reject) => {
            await console.log('type');
            await this.executeCommand(
                async () => {
                    let inputElement = await this.driver.wait(this.until.elementLocated(target), this.waitCooldown);
                    await inputElement.clear();
                    await inputElement.sendKeys(value);
                    let inputText = await inputElement.getAttribute("value");
                    let inputText2 = await inputElement.getText();
                    await this.assert.ok('' == inputText || '' == inputText2);
                    await resolve(inputElement)
                },
                'click',
                target,
                value,
                reject
            );
        }).catch((err)=>{
            this.catcherror(err, 'click', target, value,)
        })
    }

};