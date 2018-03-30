module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('тыцкаем на разные элементы в проекте', () => {})();

    await libse.click(by.xpath(`//*[contains(text(),'All projects')]`));
    await libse.open('/2340/projects/28445');


};