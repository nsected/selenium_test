module.exports =  async function test_suit_example(config, done, libse){
    allure.story('просто кейс1');
    allure.feature('кейс-заглушка для демонстрации');
    allure.createStep('основной тест пошел тут', () => {})();
    await libse.click(libse.By.css('[type="submit"]'));
};

