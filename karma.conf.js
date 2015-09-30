// Karma configuration
module.exports = function(config) {
    config.set({

        // list of files / patterns to load in the browser
        files: [
            './tests/tests.bundle.js'
        ],

        frameworks: ['mocha', 'es5-shim'],

        preprocessors: {
            './tests/tests.bundle.js': ['webpack', 'coverage']
        },

        plugins: [
            'karma-mocha',
            'karma-webpack',
            'karma-coverage',
            'karma-es5-shim',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],

        webpack: {
           module: {
               loaders: [
                   { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
               ]
           },
           watch: true
        },

        webpackServer: {
           noInfo: true
        },

        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'coverage'],

        coverageReporter: {
            // specify a common output directory
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'json' }
            ]
        }
    });
};
