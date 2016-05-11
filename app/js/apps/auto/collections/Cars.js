define(['../models/Car', 'backbone'], function(Car, Backbone) {
   
    var Cars = Backbone.Collection.extend({
    	url: '/api/Cars',
    	model: Car,
    });
   
    return Cars; 
});