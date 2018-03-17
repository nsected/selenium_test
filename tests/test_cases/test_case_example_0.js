module.exports =  async function test_suit_example(config, done, libse){
    allure.createStep('подготовка к тесту', () => {})();
    await libse.open('/signin');
};

