export default  class CommandsExecution {
    constructor() {
    }

    catcherror(err, command, target, value,) {
        console.error('\n');
        console.error('\t\t\t\t\t❌  error at:' + err.step);
        console.error('\t\t\t\t\t\terror: ' + err.name);
        console.error('\n');
        console.error('_______________________________________________');
        throw(err)
    }

      executeCommand(commands, commandName, target, value, reject ) {

          ( async () => {
            let _this = this;
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                let step;
                try {
                    iteration++;
                    await _this.driver.sleep(_this.cooldown);
                    await _this.driver.sleep(0).then(() => {
                        step = `
						command: ${commandName}
						target: ${target}
						value: ${value}`;
                        allure.createStep(step, () => {
                        })();
                    });

                    await commands();

                } catch (err) {
                    if (iteration < _this.retry_command_count) {
                        await _this.driver.sleep(_this.retryCommandCooldown);
                        console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                        err.step = step;
                        err.driver = _this.driver;
                        reject(err)
                    }
                }
            };
            await stepFunction();
        })()

    }
};