import Libse from './libse/libse';
import config from '../configs/config';

(async function test(){
    let libse = await new Libse(config);

    await libse.open('/signin');
    await libse.type(libse.By.css('#email'), 'kochetovatest25@yandex.ru');
    await libse.click(libse.By.css('[type="submit"]'));
    await libse.driver.close()

})();
