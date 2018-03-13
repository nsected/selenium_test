# TASS тесты

## Установка
1. npm install
2. Скачиваем chromedriver и помещаем его в папку с исполняемым файлом chrome
3. Прописываем путь до драйвера в PATH

* Конвертация html тестов Selenium IDE в Selenium Webdriver - npm convert_tests
* Запуст тестов - npm test
* Просмотреть отчеты в браузере - npm report

## Поддерживаемые конвертером команды: 

* 'open',
* 'click',
* 'clickAndWait',
* 'waitForElementPresent',
* 'waitForTitle',
* 'type',
* 'typeAndWait',
* 'select',
* 'assertText',
* 'assertTitle'
* 'selectFrame'
* 'focus' - делает элемент видимым
* 'assertNotEval' - исполняет js код, переданный в value, после нахождения целевого элемента. Целевой элемент доступен в переменной elem.
* 'clickAt' - программный клик при помощи js.
* 'sendKeys' - послать специальные клавиши.
* 'pause' - пауза в милисекундах.
* 'assertExpression' - проверка на истину js выражения. 
   elem_text - текст выбранного элемента, 
   elem_date - дата, созданная из текста элемента
   current_date - текущая дата.
   element - текущий лемент
   await для асинхронных функций
* assertElementPresent - ждет пока элемент станет видимым
* verifyText - тест текста элемента, на вхождение по маске. Принимает регулярное выражение. Маски с регулярками доступны в переменной mask_list
* handleText - обработка текста