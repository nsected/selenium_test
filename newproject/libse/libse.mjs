'use strict';
import CommandsExecution from './commandsExecution';
import aggregation from "aggregation/es6";
import Utils from './utils';
import Commands from './commands';
import webdriverBuilder from './webdriverBuilder';
import allureStub  from './allureStub';

export default class Libse extends aggregation(Utils, Commands, CommandsExecution) {
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