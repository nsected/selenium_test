module.exports =  async function test_suit_example(config, done, Libse){
    let libse = await new Libse(config);

    await libse.open('/signin');
    await libse.type(libse.By.css('#email'), 'kochetovatest25@yandex.ru');
    await libse.click(libse.By.css('[type="sssubmit"]'));
    await libse.driver.close()

};

