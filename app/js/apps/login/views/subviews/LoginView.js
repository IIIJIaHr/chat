define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../../templates/LoginView',
    '../../../../core/socket',
    '../../../../core/helpers',
], function($, _, Backbone, loginTemplateHbs, socket, helpers) {
    var LoginView = Backbone.View.extend({
        className: 'login-view vertical-center',
        template: loginTemplateHbs,
        events: {
            'click button.log-in': 'logIn',
            'keypress #userName': 'updateOnEnter'
        },

        logIn: function() {
            var trimName = this.$input.val().trim();
            var self = this;
            var checkUserNamePromise = new Promise(function(resolve, reflect) {
                socket.emit('check name', { name: trimName });
                socket.on('check name', function(data) {
                    if (!data.isExist) {
                        console.log('self', self);
                        resolve({ name, self });
                    } else {
                        reflect({ name: trimName, self });
                    }
                })
            });
            checkUserNamePromise.then(this.sendToServer, this.showError);
        },

        sendToServer: function(options) {
            console.log('send', options.self);
            var trimName = options.self.$input.val().trim();
            socket.emit('newUser', { name: trimName });
            let date = new Date(new Date().getTime() + 10 * 1000);
            document.cookie = `userName=${trimName}; path=/; `;
            Backbone.history.navigate('/chatroom', { trigger: true });
        },

        showError: function(options) {
            var name = options.name;
            options.self.$('.errors').text(`User "${name}" is exists yet.`);
            $('.login-region').addClass('has-error');
            $('.errors').show();
        },

        updateOnEnter(e) {
            if (e.keyCode === helpers.ENTER_KEY) {
                this.logIn();
            }
        },

        initialize: function() {
            this.render();
            this.$input = this.$('#userName');
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return LoginView;
});
