'use strict';

angular.module('app.googleNews', [
])

.directive('googleNews', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    template: '<div ng-repeat="item in news | limitTo:4"><h5><a ng-href="{{item.link}}" href="" target="blank">{{item.title}}</a></h5><p ng-bind-html="item.contentSnippet"></p></div><p><em>Read more from <a href="http://google.com/news?q={{address}}" target="_blank">Google News</a></em></p>',
    replace: false,
    /*scope: {
      location: '='
    },*/
    link: function($scope, $rootScope, $element) {
      $scope.address = $scope.location.city +'+'+ $scope.location.state;
      var googleNewsUrl = 'https://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss&q=' + $scope.address;
      $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(googleNewsUrl))
        .success(function(data) {
          $scope.news = data.responseData.feed.entries;
        });
    }
  }
})