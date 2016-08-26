/*!
 * Gruntfile.js
 *
 * Copyright 2016 (c) Collin Haines
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  grunt.initConfig({
    lesslint: {
      default: {
        src: ['client/main.less'],
        options: {
          failOnError: false,
          csslint: {
            csslintrc: 'imports/ui/stylesheets/.csslintrc'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-lesslint');

  grunt.registerTask('default', 'lesslint');
};
