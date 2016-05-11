define(['../models/User', 'backbone'], function(User, Backbone) {
   
    var Users = Backbone.Collection.extend({
      url: '/api/users',
      model: User,
      initialize: function () {
        this.on('remove', this.removeF);
      },

      removeF: function (arg) {
        console.log('remove', arg);
      }
    });
   
    return Users; 
});