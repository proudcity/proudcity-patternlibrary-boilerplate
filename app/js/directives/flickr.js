'use strict';

angular.module('app.flickr', [
])

// See https://www.flickr.com/services/api/flickr.photos.search.html
// Photo url documentation: https://www.flickr.com/services/api/misc.urls.html
.factory('Flickr', function ($resource, $rootScope) {
  return $resource('https://api.flickr.com/services/rest/', {
    api_key: '0a4705b25c964f6e42e00c5a02f5ff16',
    format: 'json', 
    jsoncallback: 'JSON_CALLBACK'
  }, { 'load': { method: 'JSONP' } });

})


.directive('flickrImage', function factory($window, $browser, $http, Flickr) {
  return {
    restrict: 'A',
    /*scope: {
      location: '='
    },*/
    link: function($scope, $element, $attributes) {
      $scope.$watch('data', function(value){
        console.log(location.city);
        if (value !=undefined) {
          Flickr.load({
            method: 'flickr.photos.search', 
            tags: 'city, town, park, people',
            lat: value.lat,
            lon: value.lng,
            sort: 'interestingness-desc',
            //geo_context: 2, // outside
            accuracy: 11, // city
            license: '4,5' //Attribution-ShareAlike License, Attribution License
          }, function(data) {
            console.log(data);
            var items = data.photos.photo;
            var key = Math.floor(Math.random() * (items.length < 10 ? items.length : 10)) + 1;
            var item = items[key];
            Flickr.load({method: 'flickr.photos.getSizes', photo_id: item.id, secret: item.secret}, function(images) {
              //var src = 'https://farm' + item.farm + '.staticflickr.com/'+ item.server +'/'+ item.id + '_'+ item.secret +'_k.jpg';
              var src = images.sizes.size[images.sizes.size.length-2].source;
              $scope.item = item;
              $element.css({
                'background-image': 'url(' + src +')'
              })
            });

            Flickr.load({method: 'flickr.photos.getInfo', photo_id: item.id, secret: item.secret}, function(info) {
              console.log(info);
              var owner = info.photo.owner;
              var name = owner.realname != undefined && owner.realname != '' ? owner.realname : owner.username;
              $element.append(
                '<span class="photo-credit">By <a href="http://flickr.com/'+ owner.path_alias +'" target="_blank">'+ name +'</a> on <a ng-href="'+ item.url +'}" target="_blank">Flickr</a></span>'
              );
            });
            
            
          });
        }
        
      });
    }
  }
})


