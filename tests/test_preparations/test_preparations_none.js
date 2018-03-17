module.exports = (driver, By, until, baseUrl, cooldown, waitCooldown)=> {
    // driver.manage().window().setPosition(0,0);
    driver.manage().window().maximize();
    driver.get(baseUrl+"/");
    driver.sleep(cooldown);
    driver.switchTo().alert().accept().catch(()=>{});
    driver.sleep(cooldown);

    driver.get(baseUrl + "/");
};