module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('логин', () => {})();
    await libse.open('/signin');
    await libse.click(by.css('[type="submit"]'));
    await libse.waitForPresent(by.css('[dir="ltr"]'));

};

