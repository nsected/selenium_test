//класс-инициализатор тестовых утилит и конфигов для тестовой библиотеки

const chrono = require('chrono-node') ;
const moment = require( 'moment');
const helpers = require( './helpers');
const masklist = require( './maskList');
const selenium = require( "selenium-webdriver");
const assert = require( 'assert');

module.exports =  class Utils {
    constructor(config) {
        this.helpers = helpers;
        this.masklist = masklist;
        this.sorting = helpers.sorting;
        this.get_elem_date = helpers.get_elem_date;
        this.scrollElementIntoMiddle = helpers.scroll_element_into_middle;
        this.regexp_test = helpers.regexp_test;
        this.previous_year_date = moment().add(-1, 'years').add(1, 'days').startOf('day').toDate();
        this.assert = assert;

        this.By = selenium.By;
        this.until = selenium.until;
        this.Key = selenium.Key;

        this.cooldown = config.cooldown;
        this.inCommandCooldown = config.inCommandCooldown;
        this.retryCommandCooldown = config.retryCommandCooldown;
        this.waitCooldown = config.waitCooldown;
        this.antiStaleCooldown = config.antiStaleCooldown;

        this.baseUrl = config.href;
        this.retry_command_count = config.retry_command_count;
    }

     parse_date(date_string) {
        let clear_date_string = chrono.parse(date_string)[0].text;
        return moment(clear_date_string, 'DD.MM.YYYY').toDate();
    }
};