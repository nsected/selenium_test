module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.story('просто кейс1');
    allure.feature('кейс-заглушка для демонстрации');
    allure.createStep('основной тест пошел тут', () => {})();
    await libse.click(by.css('[type="submit"]'));
};

