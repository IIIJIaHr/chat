define([
    'jquery',
    'underscore',
    'backbone',
    './MessageView',
    'hbs!../../templates/MessagesView',
    'socketio',
    '../../../../core/socket',
    '../../../../core/helpers',
], function($, _, Backbone, MessageView, MessagesTemplateHbs, io, socket, helpers) {

    var MessagesView = Backbone.View.extend({
        className: 'row',
        template: MessagesTemplateHbs,
        initialize: function() {
            this.subviews = [];
            this.listenTo(this.collection, 'add', this.renderOnes);
            socket.on('new message', (data) => {
                this.collection.add({
                    name: data.name,
                    text: data.text,
                    image: data.image,
                });
                // socket.emit('new id', { name: helpers.getCookie('userName'), socketId: socket.id})
                console.log('messages', socket.id);
            });
        },

        render: function() {
            this.$el.html(this.template());
            console.log(this.collection);
            this.collection.forEach(function(message, index) {
                this.renderOnes(message);
            }, this);


            return this;
        },

        renderOnes: function(message) {
            var messageView = new MessageView({ model: message });
            this.$('div:first').append(messageView.el);
            this.subviews.push(messageView);
        }
    });

    return MessagesView;
});
