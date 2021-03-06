define([
  'jquery'
], function($) {

  var viewManager = (function() {
    var currentView;

    function showView(view) {

      disposeView(currentView, function() {
        render(view);
      });
    }

    function disposeView(view, callback) {
      if (!view) {
        callback();
        return;
      }

      _disposeView(view);
      callback();

      function _disposeView(view) {
        view.subviews && view.subviews.forEach(function(subview) {
          _disposeView(subview);
        });

        view.remove();
      }
    }

    function render(view) {
      currentView = view;
      $('#app').html(currentView.el);
      currentView.render();
    }

    return {
      show: showView
    };
  })();

  return viewManager;
});
