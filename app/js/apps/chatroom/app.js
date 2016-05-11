define([
    '../chatroom/collections/Messages',
    '../chatroom/collections/Users',
    '../chatroom/views/MainView'
], function(Messages, Users, MainView) {
    return {
        run: function(viewManager) {
            var messages = new Messages();
            var users = new Users();
            var collections = [];
            var promise = new Promise(function(resolve, refect) {
                messages.fetch({
                    success: function(messagesp) {
                        console.log('messages OK', messagesp);
                        resolve(messagesp);
                    }
                }, { reset: true });
            })
            promise.then((messages) => {
                console.log('users promise');
                users.fetch({
                    success: function(users) {
                        console.log('users OK', users);
                        var mainView = new MainView({
                            collection: {
                                messages,
                                users
                            }
                        });
                        viewManager.show(mainView);
                    }
                }, { reset: true });
            });

            console.log('collects', collections);


        }
    };
});
