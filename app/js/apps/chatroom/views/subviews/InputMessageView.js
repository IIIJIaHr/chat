define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!../../templates/InputMessageView'
], function($, _, Backbone, inputMessageTemplateHbs) {
  var InputMessageView = Backbone.View.extend({
    template: inputMessageTemplateHbs,

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
  return InputMessageView;
});
