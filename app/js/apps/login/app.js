define([
    '../login/views/MainView'
], function(MainView) {
    return {
        run: function(viewManager, socket) {
            console.log(socket);
            var mainView = new MainView();

            viewManager.show(mainView);
        }
    };
});
