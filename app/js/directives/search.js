'use strict';

angular.module('app.search', [
  'autocomplete'
])

.factory('CitySearch', function ($resource, $rootScope) {
  return $resource($rootScope.citySearchUrl, {
    format: 'json',
    action: 'query',
    callback: 'JSON_CALLBACK'
  //}, { 'load': { method: 'JSONP' } });
  }, {  });

})

.controller('name', ['$scope', 'CitySearch', function($scope,CitySearch){
  
}])