define([
  'backbone',
  './subviews/LoginView'
], function(Backbone, LoginView) {

  var MainView = Backbone.View.extend({
    className: 'login-main',
    initialize: function() {
      this.subviews = [];
    },
    render: function() {
      var loginView = new LoginView();
      this.$el.append(loginView.el);
      this.subviews.push(loginView);
      return this;
    }
  });

  return MainView;
});
