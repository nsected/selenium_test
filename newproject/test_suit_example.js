const mochaInit = require('./libse/mochaInit');
const config = require('../configs/config');

const test_case_example = require('./test_case_example');

let testSuit = {
    name: 'example suit',
    cases: [
        {name: 'test suit example', script: test_case_example}
    ]
};

mochaInit(testSuit,config);