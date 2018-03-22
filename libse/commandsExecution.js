//обработчик кастомных команд. Ретраит команды при ошибках. Составляет ошибку, которая идет в аллюр отчет
module.exports =   class CommandsExecution {
    constructor() {
    }

    catcherror(err, command, target, value,) {
        throw(err)
    }

      executeCommand(commands, commandName, target, value, reject ) {
          const command = async () => {
            const stepFunction = async  (lastIteration) => {
                let iteration = lastIteration | 0;
                let step;
                try {
                    iteration++;
                    await this.driver.sleep(this.cooldown);
                    await this.driver.sleep(0).then(() => {
                        step = `
						command: ${commandName}
						target: ${target}
						value: ${value}`;
                        allure.createStep(step, () => {})();
                    });

                    await commands();

                } catch (err) {
                    if (iteration < this.retry_command_count) {
                        await this.driver.sleep(this.retryCommandCooldown);
                        console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                        err.step = step;
                        err.driver = this.driver;
                        reject(err);
                    }
                }
            };
            await stepFunction();
        };
          command();
    }
};