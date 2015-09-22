'use strict';

angular.module('app.proudcityImage', [
])

// See https://www.wikipedia.com/services/api/wikipedia.photos.search.html
// Photo url documentation: https://www.wikipedia.com/services/api/misc.urls.html
.factory('pcImage', function ($resource, $rootScope) {
  return $resource($rootScope.proudcityApi, {
    format: 'json',
    //callback: 'JSON_CALLBACK'
  }, { 
    //'load': { method: 'JSONP' } 
  });

})


.directive('proudcityImage', function factory($window, $browser, $http, $rootScope) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityImage.html',
    replace: false,
    /*scope: {
      location: '='
    },*/
    link: function($scope, $element, $attributes) {


      // Get data from api
      //$scope.$watch('data', function(value){
      if ($scope.settings == undefined || $scope.settings.images == undefined) {
        
        $http.get($rootScope.proudcityApi + 'images?city='+$scope.location.city+'&state='+$scope.location.state)
          .then(function(response) {
            angular.extend($scope.settings, response.data);
            selectImage();
          });

      }
      else {
        selectImage();
      }

      function selectImage() {
        if (
          $scope.settings.header == undefined || 
          (
            $scope.settings.header.backgroundImage == '' &&
            $scope.settings.header.backgroundColor == ''
          )
        ) {
          if ($scope.settings.suggested_image != false) {
            var image = $scope.settings.suggested_image;
          }
          else {
            var image = $scope.settings.images[Math.floor(Math.random() * $scope.settings.images.length)];
          }
          if (image.url != false) {
            $scope.settings.header.backgroundImage = image.url;
          }
        }
        
      }

      // Defaults
      $scope.colors = ['#2196F3', '#FFFFFF', '#000000', '#546476', '#A973A9', '#456D9C', '#5A97C4', '#71B7BC', '#9BBF6A', '#8897A7', '#E76C6D', '#ED9356', '#E3B14D', '#997C61'];
      $scope.blackwhite = ['white', 'black'];
      $scope.align = ['left', 'center', 'right'];


      // Open/close overlay
      $scope.overlay = false;

      $scope.open = function() {
        $scope.overlay = true;
        console.log('asdf');
      }

      $scope.close = function() {
        $scope.overlay = false;
      }

      $scope.setValue = function(sectionName, variableName, value) {
        $scope.settings[sectionName][variableName] = value;

        // Save new settings to Drupal node
        var data = {
          city: $scope.location.city,
          state: $scope.location.state
        }
        data[sectionName] = $scope.settings[sectionName];
        console.log(data);
        $http.post($rootScope.proudcityApi + 'save', data).then(function(response) {
          // Saved
        }, function(response) {
          //
        });
      
      }
    }
  }
})


