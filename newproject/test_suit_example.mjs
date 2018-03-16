import mochaInitTestSuit from './libse/mochaInitTestSuit';


import test_case_example from './test_case_example';

let testSuit = {
    name: 'example suit',
    cases: [
        {name: 'test suit example', script: test_case_example}
    ]
};

mochaInitTestSuit(testSuit);