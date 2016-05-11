define([
  'backbone',
  'core/viewManager',
  '../apps/auto/app',
  '../apps/chatroom/app',
  '../apps/login/app',
  './socket'
], function(Backbone, viewManager, Auto, Chatroom, Login, socket) {

  var Router = Backbone.Router.extend({
    routes: {
      '': 'login',
      'auto': 'auto',
      'chatroom': 'chatroom'
        // '': 'home',
    },
    home: function() {
      console.log('homepage');
    },

    auto: function() {
      console.log('auto');
      Auto.run(viewManager);
    },
    chatroom: function() {
      console.log('chatroom');
      Chatroom.run(viewManager, socket);
    },
    login: function() {
      Login.run(viewManager, socket);
    }
  });

  return Router;
});
