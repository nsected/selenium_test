module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('Promotions', () => {})();

    await libse.open('/1/promotions');
    await libse.verifyText(by.css('.described-time-value'), libse.masklist.any_date)

};