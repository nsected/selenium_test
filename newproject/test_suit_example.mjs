import mochaInit from './libse/mochaInit';
import config from '../configs/config';

import test_case_example from './test_case_example';

let testSuit = {
    name: 'example suit',
    cases: [
        {name: 'test suit example', script: test_case_example}
    ]
};

mochaInit(testSuit,config);