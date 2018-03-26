//todo кетчить неправильный require
//todo писать в ошибку текстовое содержимое тега
//todo дебаг режим
const mochaInit = require('../../libse/mochaInit');
const config = require('../../configs/default_config');

let testSuit = {
    name: 'тест демо мерчанта',
    cases: [
        {name: 'analytics',
        scripts: [
            require('../test_preparations/test_case_example_login'),
            require('../test_cases/analytics'),
        ]},
        {name: 'antifraud',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/antifraud'),
            ]},
        {name: 'boxnet',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/boxnet'),
            ]},
        {name: 'dashboard',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/dashboard'),
            ]},
        {name: 'payment_systems',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/payment_systems'),
            ]},
        {name: 'projects',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/projects'),
            ]},
        {name: 'transactions',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/transactions'),
            ]},

        {name: 'promotions',
            scripts: [
                require('../test_preparations/test_case_example_login'),
                require('../test_cases/promotions'),
            ]},

    ]
};
mochaInit(testSuit, config);