define([
    // 'jquery',
    'underscore',
    'backbone',
    'hbs!../../templates/SentRegionView',
    './SentButtonView',
    './InputMessageView',
    '../../../../core/socket',
    '../../../../core/helpers',
], function(
    _,
    Backbone,
    sentRegionTemplateHbs,
    SentButtonView,
    InputMessageView,
    socket,
    helpers
) {
    var SentRegionView = Backbone.View.extend({
        className: 'row',
        template: sentRegionTemplateHbs,
        events: {
            'click #send': 'send',
            'keypress #edit': 'updateOnEnter',
            'change #fileimage': 'changeImage',
        },

        initialize: function() {
            this.subviews = [];
        },

        render: function() {
            this.$el.html(this.template());
            this.$inputMessage = this.$('#edit');
            // console.log('socket sent', socket);
            // var sentButtonView = new SentButtonView();
            // var inputMessageView = new InputMessageView();

            // this.$el.append(sentButtonView.render().el)
            //   .append(inputMessageView.render().el);

            // this.subviews.push(sentButtonView, inputMessageView);
            return this;
        },

        send: function() {
            var trimMessage = this.$inputMessage.val().trim();
            var imgBase64 = this.imgBase64;
            var $receivers = $('input:checked');
            var receivers = [];
            $.each($receivers, function(index, el) {
                receivers.push(el.dataset['socketId']);
            });
            socket.emit('new message', {
                name: helpers.getCookie('userName'),
                text: trimMessage,
                image: imgBase64,
                receivers: receivers
            });
        },

        updateOnEnter(e) {
            if (e.keyCode === helpers.ENTER_KEY) {
                this.send();
            }
        },

        changeImage(e) {
            let data = e.originalEvent.target.files[0];
            let reader = new FileReader();
            
            reader.onload = (evt) => {
                this.$('img').remove();
                this.$el
                    .append($('<img>')
                        .attr('src', evt.target.result)
                        .addClass('img-preview')
                    );
                this.imgBase64 = evt.target.result;
            };

            if (data.size > 2000000) {
                console.log(e);
                // e.originalEvent.target.files.length = 0;
                this.$('img').remove();
                $('#image-error').show();
                this.imgBase64 = null;
            } else {
                $('#image-error').hide();
                reader.readAsDataURL(data);
            }
        }
    });

    return SentRegionView;

});
