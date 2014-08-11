angular.module('starter.services', [])

.factory('User', function($http) {
  return {
    regsiter: function(userData, callbackFunc) {
      var responsePromise = $http.get("http://wahabkotwal.net/projects/bawarchi/index.php/webservice/dashboard");

      responsePromise.success(function(data, status, headers, config) {
        callbackFunc(data);
      });

      responsePromise.error(function(data, status, headers, config) {
        console.log("in fail");
      });
    },

    login: function(userData, callbackFunc) {
      var responsePromise = $http.get("http://wahabkotwal.net/projects/bawarchi/index.php/webservice/get_latest_recipe/" + typeId);

      responsePromise.success(function(data, status, headers, config) {
        callbackFunc(data);
      });

      responsePromise.error(function(data, status, headers, config) {
        console.log("in fail");
      });
    },

    getUser: function(user_id) {
      var responsePromise = $http.get("http://wahabkotwal.net/projects/bawarchi/index.php/webservice/save_device/" + device_id);
    }
  }
})