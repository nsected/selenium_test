const assert = require('assert');
const chrono = require('chrono-node');
const os = require('os');
const Key = require('selenium-webdriver').Key;
const moment = require('moment');
const config = require('../../configs/config');
const helpers = require('./helpers');
const masklist = require('./masklist');

module.exports =  class {
    constructor(){
        this.helpers = helpers;
        this.masklist = masklist;
        this.sorting = helpers.sorting;
        this.get_elem_date = helpers.get_elem_date;
        this.scrollElementIntoMiddle = helpers.scroll_element_into_middle;
        this.regexp_test = helpers.regexp_test;
        this.cooldown = config.cooldown;
        this.inCommandCooldown = config.inCommandCooldown;
        this.retryCommandCooldown = config.retryCommandCooldown;
        this.waitCooldown = config.waitCooldown;
        this.baseUrl = config.href;
        this.retry_command_count = config.retry_command_count;
        this.previous_year_date = moment().add(-1, 'years').add(1, 'days').startOf('day').toDate();
    }

     parse_date(date_string) {
        let clear_date_string = chrono.parse(date_string)[0].text;
        return moment(clear_date_string, 'DD.MM.YYYY').toDate();
    }
};