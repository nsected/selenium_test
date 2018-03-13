module.exports =  class {
    constructor(){
    }

    catcherror(err) {
        let data = {};
        data.step = step;
        data.err = err;
        data.driver = this.driver;
        throw data
    }

    async click (selector) {
        let stepFunction = async function (lastIteration) {
            let iteration = lastIteration | 0;
            try {
                iteration++;
                await this.driver.sleep(cooldown);
                await this.driver.sleep(0).then(()=>{
                    step = `
						command: click
						target: ${selector}
						`;
                    allure.createStep(step,()=>{})();
                });

                let element = await this.driver.wait(this.until.elementLocated(selector), this.waitCooldown);
                await this.driver.wait(this.until.elementIsEnabled(element),this.waitCooldown);
                await this.driver.executeScript(this.scrollElementIntoMiddle, element);
                await this.driver.sleep(this.inCommandCooldown);
                await this.driver.wait(this.until.elementLocated(selector),this.waitCooldown).click();

            } catch (err) {
                if (iteration < this.retry_command_count) {
                    await this.driver.sleep(this.retryCommandCooldown);
                    console.log('↻' + step);
                    await stepFunction(iteration)
                } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                    this.catcherror(err)
                }
            }
        };
        await stepFunction();
    }
};