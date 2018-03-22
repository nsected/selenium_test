//обработчик кастомных команд. Ретраит команды при ошибках. Составляет ошибку, которая идет в аллюр отчет
module.exports =   class CommandsExecution {
    constructor() {
    }

    catcherror(err, command, target, value,) {
        // console.log('\n');
        // console.log('\t\t\t\t\t❌  error at:' + err.step);
        // console.log('\t\t\t\t\t\terror: ' + err.name);
        // console.log('\n');
        // console.log('_______________________________________________');
        throw(err)
    }

      executeCommand(commands, commandName, target, value, reject ) {
          let _this = this;
          command();
          async function command() {
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
                        reject(err);
                    }
                }
            };
            await stepFunction();
        }
    }
};