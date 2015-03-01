// Karma configuration
var webpack = require('./webpack.config');

module.exports = function(config) {
    //Set basic Brixo karma configuiration
    require('brixo-framework/config/karma.conf.js')(webpack)(config);

    config.set({
        // list of files / patterns to load in the browser
        files: [
            { pattern: 'tests/**', included: true },
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'dots'],
    });
};
