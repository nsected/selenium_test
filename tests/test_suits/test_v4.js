const mochaInit = require('../../libse/mochaInit');
const config = require('../../configs/default_config');

let testSuit = {
    name: 'тест v4 мерчанта',
    cases: [
        {name: 'analytics',
            scripts: [
                require('../test_preparations/login_v4'),
                require('../test_cases/v4/project'),
            ]},

    ]
};
mochaInit(testSuit, config);