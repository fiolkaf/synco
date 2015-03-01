module.exports = function(grunt) {
    var _ = require('lodash');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-scaffold');
    grunt.loadTasks("./node_modules/brixo-framework/grunt-tasks");

    var webpackGrunt = require('brixo-framework/config/grunt.webpack.config.js')(grunt);
    webpackGrunt.configItems('elements');
    webpackGrunt.configItems('components');

    grunt.initConfig({
        
        open: _.merge(webpackGrunt.open, {
            start: {
                path : 'http://localhost:8090/'
            }
        }),
        
        jshint: {
            all: {
                src: ['gruntfile.js', 'components/**/*.js*', 'elements/**/*.js*', 'styleguide/**/*.js*'],
                jshintrc: true
            }
        },
        
        karma: _.merge(webpackGrunt.karma, {
        }),

        webpack: _.merge(webpackGrunt.webpack, {
        }),

        "webpack-dev-server": _.merge(webpackGrunt["webpack-dev-server"], {            
        }),

        scaffold: require('brixo-framework/scaffolding/scaffold.config.js')(grunt, webpackGrunt.configItem)
    });

    grunt.registerTask('default', ['open:start', 'webpack-dev-server:start']);
};