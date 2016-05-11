define(['socketio'], function(io) {

  var socket = (function() {
    return io.connect("http://localhost:8000")
  })();

  return socket;
});
