const path = require("path");
const testRunnerConfig = require('test-runner-config');
const _ = require("underscore");
const unitTestRunnerConfig = require("./.unitTestRunnerConfig.js");

const wallabyFiles = testRunnerConfig.getWallabyFiles(unitTestRunnerConfig.files);
const _processorConfig = {
        preprocessors: {

            '**/*.js': file => require('babel').transform(file.content, {
            sourceMap: true,
            blacklist: ["useStrict"],
        }),

    },

    env: {
        type: 'node',
        runner: path.resolve(process.env.HOME, '.nvm/versions/node/v4.4.0/bin/node'),
    }
};

const _config = _.extend({}, wallabyFiles, _processorConfig);

module.exports = function () {
    return _config;
};
