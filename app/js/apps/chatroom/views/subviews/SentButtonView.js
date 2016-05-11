define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!../../templates/SentButtonView'
], function($, _, Backbone, sentButtonTemplateHbs) {
  var SentButtonView = Backbone.View.extend({
    template: sentButtonTemplateHbs,

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
  
  return SentButtonView;
});
