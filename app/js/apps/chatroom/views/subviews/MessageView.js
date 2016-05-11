define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!../../templates/MessageView'
], function($, _, Backbone, messageTemplateHbs) {
  var MessageView = Backbone.View.extend({
    tagName: 'div',
    template: messageTemplateHbs,
    className: 'col-lg-12',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      console.log(this.model.toJSON());
      return this;
    }
  });
  return MessageView;
});
