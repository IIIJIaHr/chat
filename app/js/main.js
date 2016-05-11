/*global require*/
'use strict';
// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  hbs: {
    templateExtension: 'html'
  },
  shim: {
    underscore: {
      exsports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    socketio: {
      exports: 'io'
    }
  },


  paths: {
    jquery: '../components/jquery/dist/jquery',
    underscore: '../components/underscore/underscore',
    backbone: '../components/backbone/backbone',
    hbs: '../components/require-handlebars-plugin/hbs',
    handlebars: '../components/handlebars/handlebars',
    bootstrap: '../components/bootstrap-css/js/bootstrap.min',
    socketio: "/socket.io/socket.io"
  }
});

require([
  'core/router',
  'core/client',
  'backbone'
], function(Router, client, Backbone) {
  window.Router = new Router();
  /*jshint nonew:false*/
  client.setup(window, { root: '/' });
  Backbone.history.start({ pushState: true });
});
