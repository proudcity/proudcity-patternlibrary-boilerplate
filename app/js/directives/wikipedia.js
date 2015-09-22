'use strict';

angular.module('app.wikipedia', [
])

// See https://www.wikipedia.com/services/api/wikipedia.photos.search.html
// Photo url documentation: https://www.wikipedia.com/services/api/misc.urls.html
.factory('wikipedia', function ($resource, $rootScope) {
  return $resource('https://en.wikipedia.org/w/api.php', {
    format: 'json',
    action: 'query',
    callback: 'JSON_CALLBACK'
  }, { 'load': { method: 'JSONP' } });

})


.directive('wikipediaImage', function factory($window, $browser, $http, wikipedia) {
  return {
    restrict: 'A',
    /*scope: {
      location: '='
    },*/
    firstResult: function(ob) {
      for (var props in ob) {
        return prop;
      }
    },
    link: function($scope, $element, $attributes) {
      $scope.$watch('data', function(value){
        if (value != undefined) {
          var query = ($scope.location.city +',_'+ $scope.location.state).replace('\ ', '\_');
          wikipedia.load({
            titles: query,
            prop: 'pageimages',
            pithumbsize: 2000
          }, function(data) {
            console.log(data);
            if (data.query.pages != undefined && data.query.pages[Object.keys(data.query.pages)[0]].thumbnail != undefined) {
              var src = data.query.pages[Object.keys(data.query.pages)[0]].thumbnail.source;
              $element.css({
                'background-image': 'url(' + src +')'
              }).append(
                '<span class="photo-credit">From  <a href="https://en.wikipedia.org/wiki/'+ query +'" target="_blank">Wikipedia</a></span>'
              );
            }
            else {
              // Try a query with just the city (no state).  This was needed for San Francisco
              // @todo: get rid of code replication
              query = $scope.location.city.replace('\ ', '\_');
              wikipedia.load({
                titles: query,
                list: 'allimages'//,
                //pithumbsize: 2000
              }, function(data) {
                if (data.query.pages != undefined && data.query.pages[Object.keys(data.query.pages)[0]].thumbnail != undefined) {
                  var src = data.query.pages[Object.keys(data.query.pages)[0]].thumbnail.source;
                                console.log(data.query.pages);

                  $element.css({
                    'background-image': 'url(' + src +')'
                  }).append(
                    '<span class="photo-credit">From  <a href="https://en.wikipedia.org/wiki/'+ query +'" target="_blank">Wikipedia</a></span>'
                  );
                }
              });

            }
            
          });
        }
        
      });
      
    }
  }
})


