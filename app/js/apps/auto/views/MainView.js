define([
  'backbone',
  '../views/CarsView'
  ], function(Backbone, CarsView) {
   
    var MainView = Backbone.View.extend({
        initialize: function () {
          this.subviews = [];
        },
        render: function () {
          var carsView = new CarsView({collection: this.collection});
          this.$el.append(carsView.render().el);
          this.subviews.push(carsView);
          return this;
        }
    });
   
    return MainView; 
});