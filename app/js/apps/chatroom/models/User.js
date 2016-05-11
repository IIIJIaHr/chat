define([
    'backbone'
], function(Backbone) {
    var User = Backbone.Model.extend({
        defaults: {
            name: 'username',
            socketId: '',
        },
        idAttribute: "_id"
    });
    return User;
});
