angular.module('starter.controllers', ['Parse'])

.controller('AppCtrl', function($scope, $state, Parse) {
  $scope.auth = Parse.auth;

  console.log(JSON.stringify($scope.auth));

  $scope.signout = function() {
    Parse.auth.logout();
    $state.go('user.login');
  };
})


.controller('UserCtrl', function($scope, $stateParams) {
  
})

.controller('LoginCtrl', function($scope, $stateParams, $ionicLoading, $state, Parse) {

  $scope.auth = Parse.auth;
  $scope.user = {};
  $scope.errorMessage = null;

  $scope.doLogin = function(user) 
  {
    if(!(user.username && user.password)) 
    {
      return $scope.errorMessage = 'Please supply a username and password';
    }
   
    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i>'
    });

    return Parse.auth.login(user.username, user.password).then(function(userData) {
      $ionicLoading.hide();
      $state.go('app.home');
    }, 
    function(err) 
    {
      $ionicLoading.hide();
      return $scope.errorMessage = err.data.error;
    });
  };
})

.controller('LogoutCtrl', function($scope, $stateParams, $state, Parse) {
  Parse.auth.logout();
  $state.go('user.login');
})

.controller('RegisterCtrl', function($scope, $stateParams, $ionicLoading, $state, Parse) {

  //$scope.auth = Parse.auth;
  $scope.user = {};
  $scope.errorMessage = null;

  $scope.doRegister = function(user) {

    if(user.password !== user.confirmPassword) 
    {
      return $scope.errorMessage = "Passwords must match";
    }
    if(!(user.username && user.password)) 
    {
      return $scope.errorMessage = 'Please enter a username and password';
    }
    
    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i>'
    });

    return Parse.auth.register(user.username, user.password, user.email).then(function(userData){
      console.log(JSON.stringify(userData));
      $ionicLoading.hide();
      $state.go('app.home');
    },function(err) 
    {
      $ionicLoading.hide();
      return $scope.errorMessage = err.data.error;
    });
  };

})

.controller('HomeCtrl', function($scope, $stateParams, $state) {
  
})

.controller('ProfileCtrl', function($scope, $ionicLoading, $stateParams, $state, $http, Parse) {

  $scope.user = Parse.auth.currentUser;
  //alert(JSON.stringify($scope.user));
  
  //$scope.user.profilePicture = "http://wahabkotwal.net/images/about.jpg";
  $scope.changePicture = function() {
    navigator.camera.getPicture(gotPic, failHandler, {
      quality:50, 
      destinationType:navigator.camera.DestinationType.DATA_URL,
      sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
  };

  $scope.uploadFile = function(files) {
    //console.log(files[0]);

    var file = 'data:image/jpeg;base64,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';

    $http.post("https://api.parse.com/1/files/image.jpg", file, {
      withCredentials: false,
      headers: {
          'X-Parse-Application-Id': 'RAv0nLg4Rql3iQL6IY17GZno6Rcglwm1hTnDTDRp',
          'X-Parse-REST-API-Key': '1Kuqo3Ru2J0yJYwAP7S70xbZeSZgeoXSm60a11gT',
          'Content-Type': 'image/jpeg'
      },
      transformRequest: angular.identity
      }).then(function(data) 
      {
        console.log("then data" + JSON.stringify(data));
        $scope.user.profilePicture = data.data.url;

        return Parse.auth.updatePicuture(data.data.url, $scope.user.objectId).then(function(userData){
          console.log("after update" + JSON.stringify(userData));
        });

        $scope.$apply();

      });
  };

  /*function gotPic(imageData) 
  {
    $http.post("https://api.parse.com/1/files/image.jpg", imageData, {
      withCredentials: false,
      headers: {
          'X-Parse-Application-Id': 'RAv0nLg4Rql3iQL6IY17GZno6Rcglwm1hTnDTDRp',
          'X-Parse-REST-API-Key': '1Kuqo3Ru2J0yJYwAP7S70xbZeSZgeoXSm60a11gT',
          'Content-Type': 'image/jpeg'
      },
      transformRequest: angular.identity
      })
      .then(function(data) 
      {
        $scope.user.profilePicture = imageData;
        $scope.$apply();
        return Parse.auth.updatePicuture(data.data.url, $scope.user.objectId).then(function(userData){
          //alert("after update" + JSON.stringify(userData)); 
          return;
        });

      });
  }*/

  function gotPic(imageData) 
  {

    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i>'
    });

    var data = 'data:image/jpeg;base64,' + imageData;
    $scope.user.profilePicture = data;
    $scope.$apply();
    return Parse.auth.updatePicuture(data, $scope.user.objectId).then(function(userData){
      $ionicLoading.hide();
      return;
    });

    $ionicLoading.hide();
  }
  
  function failHandler(e) 
  {
    alert("ErrorFromC");
    alert(e);
    console.log(e.toString());
  }

  $scope.updateData = function(user) 
  { 
    if(!(user.name)) 
      return $scope.errorMessage = 'Please enter you name';

    if(!(user.aboutme)) 
      return $scope.errorMessage = 'Please tell us something about you self';

    if(!(user.email)) 
      return $scope.errorMessage = 'Please enter your email address';

    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i>'
    });

    console.log("shahpar" + JSON.stringify(user));
    return Parse.auth.update(user.username, user.password, user.email, user.name, user.aboutme, user.objectId).then(function(userData){
      console.log("shahpar" + JSON.stringify(userData));
      $ionicLoading.hide();
      return $scope.confirmMessage = 'You profile has been successfully updated';
    },function(err) 
    {
      $ionicLoading.hide();
      return $scope.errorMessage = err.data.error;
    });

  };

});

