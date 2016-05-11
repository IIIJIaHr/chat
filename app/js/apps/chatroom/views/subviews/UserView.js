define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!../../templates/UserView'
], function($, _, Backbone, userTemplateHbs) {
  var UserView = Backbone.View.extend({
    tagName: 'li',
    template: userTemplateHbs,
    className: 'col-lg-12',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return UserView;
});
