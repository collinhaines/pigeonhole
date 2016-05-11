module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'client/js/*.js', '!client/js/bootstrap.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    lesslint: {
      src: ['client/less/*.less'],
      options: {
        imports:     ['client/less/**/*.import.less'],
        failOnError: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lesslint');

  grunt.registerTask('default', ['jshint', 'lesslint']);
}; // module.exports = function (grunt)
