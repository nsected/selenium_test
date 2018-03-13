const test_case_handler = require('../utils/test_case_handler');
const test_prep_file = "../test_preparations/test_preparations_none";

describe(
    'test example',
    () => {
        test_case('prem_22.3_contracts_tabs.html');

        function test_case(test_case, own_prep_file) {
            it(
                test_case,
                done => {
                    test_case_handler(test_case, done, own_prep_file||test_prep_file)
                }
            )
        }
    }
);