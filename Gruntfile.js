module.exports = function(grunt) {

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
            src: 'javascript/*.js',
            dest: 'dist/'
          }
        },
        ngtemplates: {},
        concat: {},
        ngmin: {},
        uglify: {
          my_target: {
            files: {
              'dist/app.min.js': ['javascript/*.js']
            }
          }
        },
        karma: {},
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('default', ["clean","copy:before","uglify"]);};
