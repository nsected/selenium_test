const config = require('../configs/config');
var test_prep_file = "../converted_tests/test_preparations_premium";

//todo: анализ пользователей
//todo: починить тест 1 и 2

describe('test admin', function () {
    test_case('admin_2_attach_company.html');
    test_case('admin_3_promo_code.html');
    test_case('admin_4_store.html');
    test_case('admin_1_user_rights.html');

    function test_case(test_case) {
        it(test_case, done => {
            console.log('test ' + test_case + ' started');
            require('../converted_tests/' + test_case)(config, test_prep_file)
                .then(() => {
                        console.log(test_case + ' pass');
                        done();
                    }
                )
                .catch(
                    error=> {
                        var url;
                        error.driver.getCurrentUrl()
                            .then(link=> {
                                url=link;
                                return error.driver.takeScreenshot()
                            })
                            .then(res => {
                                allure.createAttachment("error_screen_" + test_case, new Buffer(res, "base64"));
                                allure.description(
                                    'Ошибка на шаге ' + error.step
                                    + '\nАдрес: ' + url, 'markdown'
                                );
                                console.error(test_case + ' fail');
                                console.log(url);
                                console.error(error.err);
                                done(error.err);
                            });
                    }
                )
        });
    }
});