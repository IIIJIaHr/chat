define([
    'backbone'
], function (Backbone) {
    var Car = Backbone.Model.extend({
        defaults:{
            mark: 'default mark',
            model: 'default model'
        }
    });
    return Car;
});