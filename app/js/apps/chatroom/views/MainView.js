define([
    'backbone',
    './subviews/MessagesView',
    './subviews/UsersView',
    './subviews/SentRegionView',
    'hbs!../templates/MainView',
], function(Backbone, MessagesView, UsersView, SentRegionView, MainViewTemplate) {

    var MainView = Backbone.View.extend({
        className: 'main-chatroom',
        template: MainViewTemplate,
        initialize: function() {
            this.subviews = [];
            // this.render();
            console.log('this main', this);
        },

        render: function() {
            this.$el.html(this.template());
            var messagesView = new MessagesView({
                collection: this.collection.messages
            });
            var usersView = new UsersView({
                collection: this.collection.users
            })
            var sentRegionView = new SentRegionView();

            this.$('.users').append(usersView.render().el);
            this.$('.main')
                .append(messagesView.render().el)
                .append(sentRegionView.render().el);
            this.subviews.push(messagesView, sentRegionView, usersView);

            return this;
        }
    });

    return MainView;
});
