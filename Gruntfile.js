module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    wiredep: {
      target: {
        src: 'index.html'
      },
      options: {
        exclude: [
          'app/components/requirejs/require.js',
          // 'app/components/jquery/dist/jquery.js',
          'app/components/underscore/underscore.js',
          'app/components/backbone/backbone.js',
          'app/components/handlebars/handlebars.js',
          'app/components/bootstrap-css/js/bootstrap.min.js'
        ]
      }
    },

    express: {
      options: {},
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      express: {
        files: [
          'server.js',
          'source/**/*/*.js',
          'source/chatSocket.js'
        ],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      public: {
        files: [
          'app/**/*/*.js',
          'app/**/*/*.css',
          'app/**/*/*.html',
          'app/*.js',
          'index.html',
          'index2.html',
          'Gruntfile.js',
          'sassproject/**/*.css'
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-wiredep');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task(s).
  grunt.registerTask('server', ['express:dev', 'watch']);
};
