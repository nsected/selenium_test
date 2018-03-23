module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!test transactions', () => {})();

    await libse.open('/1/finance/transactions/search');
    await libse.verifyText(by.css('[dir="ltr"]'), libse.masklist.digit)

};