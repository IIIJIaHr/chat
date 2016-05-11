define([], function() {
   
    var helpers = (function() {
      function getCookie (name) {
        var arr = document.cookie.split('; ');
        var index = arr.findIndex(function(elem) {
          return elem.startsWith(name);
        })
        if(~index){
          return arr[index].split('=')[1];
        }

        return;
      }

      return {
        getCookie: getCookie,
        ENTER_KEY: 13,
        ESCAPE_KEY: 27
      }
    })();
   
    return helpers; 
});