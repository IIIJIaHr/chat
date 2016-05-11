define([
    'jquery',
    'underscore',
    'backbone',
    './UserView',
    'hbs!../../templates/UsersView',
    'socketio',
    '../../../../core/socket'
], function($, _, Backbone, UserView, UsersTemplateHbs, io, socket) {

    var UsersView = Backbone.View.extend({
        className: 'ul',
        template: UsersTemplateHbs,
        initialize: function() {
            socket.on('new user', () => {
                this.collection.fetch();
                this.render();
                console.log('new user');
            });
            socket.on('user leave', () => {
                this.collection.fetch();
                this.render();
                console.log('disconnect');
            })
            this.subviews = [];
            this.listenTo(this.collection, 'add', this.renderOnes);
            this.listenTo(this.collection, 'reset', this.render);
        },
  
        render: function() {
            this.$el.html(this.template());
            this.collection.forEach(function(user, index) {
                this.renderOnes(user);
            }, this);

            return this;
        },

        renderOnes: function(user) {
            var userView = new UserView({ model: user });
            this.$el.append(userView.el);
            this.subviews.push(userView);
        }
    });

    return UsersView;
});
