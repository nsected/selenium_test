const aggregation = require("aggregation/es6");
const Utils = require('./utils');
const Commands = require('./commands');
const webdriverBuilder = require('./webdriverBuilder');

module.exports = class extends aggregation(Utils, Commands) {
    async constructor(config) {
        super();
        this.driver = await webdriverBuilder(config)
    }
};