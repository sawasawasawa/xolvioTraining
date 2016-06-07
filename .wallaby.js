var path = require("path");
// var testRunnerConfig = require('test-runner-config');
var _ = require("underscore");
var babel = require('babel');
// var unitTestRunnerConfig = require("./.unitTestRunnerConfig.js");

module.exports = function () {

   var _processorConfig = {
            preprocessors: {

                '**/*.js': file => babel.transform(file.content, {
                    sourceMap: true,
                    blacklist: ["useStrict"],
                }),

            },

            env: {
                type: 'node',
                runner: path.resolve(process.env.HOME, '.nvm/versions/node/v4.4.0/bin/node'),
            },

            debug: true
        },

    _config = _.extend({},
        {
            files: [
                {pattern: 'src/imports/**/*.@(js|jsx)'},
                {pattern: 'src/imports/**/*-spec.@(js|jsx)', ignore: true},
            ],
            tests: [
                {pattern: 'src/imports/**/*-spec.@(js|jsx)'},
            ]
        },
        _processorConfig
    );

    return _config;
};
