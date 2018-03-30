module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('логин', () => {})();
    await libse.open('/');
    await libse.type(by.css('[type="email"]'), 'nsected@gmail.com');
    await libse.type(by.css('type="password"'), 'Pl28434884');
    await libse.click(by.css('[type="submit"]'));
    await libse.waitForPresent(by.css('.start__content__title'));

};

