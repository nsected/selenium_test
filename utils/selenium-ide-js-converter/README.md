# Selenium IDE JS Converter
Javascript Converter for html file that is generated from Selenium IDE.


####Usage:
- Create 2 folders. One is for storing HTML created from Selenium IDE, another one is for JavaScript files that will be created using this converter.
- Put html files in the 'HTML' folder.
- Modify 'node_modules/selenium-ide-js-converter/jsTemplate.js' to match your requirement (I have attached some default template along with this package. I'm now using **Selenium-webdriver** and **chai** for this test. You can freely modify this template.Just don't forget to put '{-actions-}' which is where your test actions will be put on.)
- use the command "require('selenium-ide-js-converter')('html folder name','js folder name')" and you will get js file in js output folder


#Installation
```
npm i selenium-ide-js-converter
```

####Supported command:
```
open
click
clickAndWait
waitForElementPresent
waitForTitle
type
typeAndWait
select
assetText
assertTitle
```

To add more command you can put it in 'mappingOrder' variable in 'interpretOrder' function.

