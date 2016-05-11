define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!../templates/CarView'
], function($, _, Backbone, carsTemplateHbs) {
  var CarView = Backbone.View.extend({
    tagName: 'div',
    template: carsTemplateHbs,
    className: 'col-md-4 col-lg-3',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return CarView;
});
