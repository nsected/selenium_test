const mochaInit = require('../../libse/mochaInit');
const config = require('../../configs/default_config');

let testSuit = {
    name: 'example suit',
    cases: [
        {
            name: 'тест демо мерчанта из нескольких частей',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/test_case_example_pass'),
            ]
        }
    ]
};

mochaInit(testSuit, config);