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
            require('../test_preparations/demo_v3/test_case_example_login'),
            require('../test_cases/demo_v3/analytics'),
        ]},
        {name: 'antifraud',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/antifraud'),
            ]},
        {name: 'boxnet',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/boxnet'),
            ]},
        {name: 'dashboard',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/dashboard'),
            ]},
        {name: 'payment_systems',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/payment_systems'),
            ]},
        {name: 'projects',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/projects'),
            ]},
        {name: 'transactions',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/transactions'),
            ]},
        {name: 'promotions',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/promotions'),
            ]},
        {name: 'transaction_registry',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/transaction_registry'),
            ]},
        {name: 'payouts',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/payouts'),
            ]},
        {name: 'finance/reports',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/reports'),
            ]},
        {name: 'recurring_payments',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/recurring_payments'),
            ]},
        {name: 'coupons',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/coupons'),
            ]},
        {name: 'users_operations',
            scripts: [
                require('../test_preparations/demo_v3/test_case_example_login'),
                require('../test_cases/demo_v3/users_operations'),
            ]},

    ]
};
mochaInit(testSuit, config);