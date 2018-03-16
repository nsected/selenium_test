'use strict';
const CommandsExecution = require( './commandsExecution');
const aggregation = require( "aggregation/es6");
const Utils = require( './utils');
const Commands = require( './commands');
const webdriverBuilder = require( './webdriverBuilder');
const allureStub  = require( './allureStub');


module.exports =  class Libse extends aggregation(Utils, Commands, CommandsExecution) {
    constructor(config) {
        super(config);
        this.config = config;
        allureStub();

        return new Promise(async (resolve, reject) => {
            this.driver = await webdriverBuilder(config);
            await resolve(this)
        })
    }
};