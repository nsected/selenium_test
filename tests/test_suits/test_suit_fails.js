const mochaInit = require('../../libse/mochaInit');
const config = require('../../configs/default_config');

let testSuit = {
    name: 'example suit fails',
    cases: [
        {
            name: 'тест, который падает',
            scripts: [
                require('../test_cases/test_case_example_fail'),
            ]
        }
    ]
};

mochaInit(testSuit, config);