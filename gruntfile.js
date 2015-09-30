module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
            options: {
                esnext: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        coverage: {
            default: {
                options: {
                    thresholds: {
                        'statements': 10,
                        'branches': 10,
                        'lines': 10,
                        'functions': 10
                    },
                    dir: 'coverage',
                    root: '.'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-istanbul-coverage');

    grunt.registerTask('default', ['jshint', 'karma', 'coverage']);
};
