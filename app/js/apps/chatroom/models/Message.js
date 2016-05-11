define([
    'backbone'
], function(Backbone) {
    var Message = Backbone.Model.extend({
        defaults: {
            name: 'default author',
            text: 'default text',
            image: '',
            recievers: [],
        }
    });
    return Message;
});
