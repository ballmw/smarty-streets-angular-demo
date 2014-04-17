module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            temp: {
                src: '.temp/'
            },
            dist: {
                src: 'dist/'
            }
        },
        copy: {
            before: {
                files: [
                    {expand: true, cwd: 'javascript/', src: ['*.js'], dest: '.temp'}
                ]
            }
        },
        ngtemplates: {
            app: {
                cwd: 'templates',
                options: {
                    module: '<%= pkg.module %>' + '.templates', /*make configurable through package.json*/
                    standalone: true,
                    prefix: 'templates/'
                },
                src: '**.html',
                dest: 'dist/smarty-streets.tpls.js'
            }
        },
        concat: {
            dist: {
                src: [
                    '.temp/smarty-streets-services.js',
                    '.temp/smarty-streets-controllers.js',
                    '.temp/smarty-streets-directives.js'
                ],
                dest: 'dist/smarty-streets.js'
            }
        },

        ngmin: {
            dist: {
                files: {
                    'dist/smarty-streets.ng.js': 'dist/smarty-streets.js',
                    'dist/smarty-streets.tpls.ng.js': 'dist/smarty-streets.tpls.js'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/smarty-streets.min.js': ['dist/smarty-streets.ng.js'],
                    'dist/smarty-streets.tpls.min.js': ['dist/smarty-streets.tpls.ng.js']
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 8081,
                    keepalive: true,
                    open: 'http://localhost:8081/test/scenarios',
                    base: '.'
                }
            }
        },
        /*watch: {
            dev: {
                tasks: ['copy:before', "ngtemplates:app"]
            }
        },*/
        karma: {
            unit: {
                configFile: 'test/config/karma.mocks.conf.js',
                background: false
            }
        },
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            test: {
                configFile: 'test/config/protractor.conf.js', // Target-specific config file
                options: {
                    args: {
                        verbose:true,
                        debug:true
                    } // Target-specific arguments
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('e2e', ['protractor:test']);

    grunt.registerTask('default', ["karma", "clean", "copy:before", "ngtemplates:app", "concat:dist", "ngmin:dist", "uglify:dist"]);


};
