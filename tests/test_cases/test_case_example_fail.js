module.exports =  async function test_suit_example(config, done, libse){
    allure.story('этот кейс должен упасть');
    allure.feature('кейс падает да');

    await libse.open('/signin');
    await libse.type(libse.By.css('#e1mail'), 'kochetovatest25@yandex.ru');
    await libse.click(libse.By.css('[type="submit"]'));
};

