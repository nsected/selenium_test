const mochaInit = require('../../libse/mochaInit');
const config = require('../../configs/default_config');

let testSuit = {
    name: 'example suit',
    cases: [
        {
            name: 'этот тест состоит из нескольких частей',
            scripts: [
                require('../test_cases/test_case_example_0'),
                require('../test_cases/test_case_example_1'),
            ]
        },
        {
            name: 'this should fail',
            scripts: [
                require('../test_cases/test_case_example_fail')
            ]
        }
    ]
};

mochaInit(testSuit, config);