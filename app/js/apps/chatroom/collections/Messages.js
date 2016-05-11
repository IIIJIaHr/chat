define(['../models/Message', 'backbone'], function(Message, Backbone) {
   
    var Messages = Backbone.Collection.extend({
    	url: '/api/messages',
    	model: Message,
    });
   
    return Messages; 
});