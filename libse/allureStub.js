module.exports =
    function () {
        if (global.allure === undefined) {
            global.allure = {};
            global.allure.createAttachment = _ => {
                return _ => {
                }
            };
            global.allure.description = _ => {
                return _ => {
                }
            };
            global.allure.createStep = function (step, callback) {
                return _ => {
                    callback()
                }
            };
        }
    };