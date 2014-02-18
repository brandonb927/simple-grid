module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * Simple-Grid v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
            ' */\n',

    // Directory variables
    lessDir : 'less/',
    cssDir  : 'css/',

    // Run LESS CSS compilation
    less: {
      compile: {
        files: {
          "<%= cssDir %><%= pkg.name %>.css": "<%= lessDir %><%= pkg.name %>.less"
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'css/<%= pkg.name %>.min.css': 'css/<%= pkg.name %>.css',
        }
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: [
          'css/<%= pkg.name %>.css',
          'css/<%= pkg.name %>.min.css',
        ]
      }
    },

    // Watch for changes on these files
    watch: {
      options: {
        nospawn: true
      },
      less: {
        files: ['<%= lessDir %>**/*.less'],
        tasks: ['less']
      }
    }
  })


  // Grunt plugins
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Registered Grunt tasks
  grunt.registerTask('default', ['less', 'usebanner', 'watch']);
}