define([
  '../auto/collections/Cars',
  '../auto/views/MainView'
  ], function(Cars, MainView) {
    return {
      run: function (viewManager) {
        var cars = new Cars();
        cars.fetch({
          success: function (cars) {
            var mainView = new MainView({collection: cars});

            viewManager.show(mainView);
          }
        });  
      }
    };
});