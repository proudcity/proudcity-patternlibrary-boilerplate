'use strict';

angular.module('app.social', [
])

// See https://www.wikipedia.com/services/api/wikipedia.photos.search.html
// Photo url documentation: https://www.wikipedia.com/services/api/misc.urls.html
.factory('Social', function ($resource, $rootScope) {
  return $resource($rootScope.socialApi, {
    format: 'json',
    action: 'query',
    callback: 'JSON_CALLBACK'
  //}, { 'load': { method: 'JSONP' } });
  }, {  });

})

.controller('SocialController', ['$scope', function($scope){
  $scope.social = [
    {
      service: 'twitter',
      title: 'SLC Police Dept.',
      account: '@slcpd',
      text: '50 kids get to go to @<a href="http://www.twitter.com/Target">Target</a> with officers for #<a href="http://twitter.com/search/%23shopwithacop">shopwithacop</a>.<a href="http://t.co/MD1NjV3wxF">http://t.co/MD1NjV3wxF</a>',
      date: 1360413309421
    },
    {
      service: 'instagram',
      account: 'slcmayorsoffice',
      image: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11352163_1628925684059367_490994342_n.jpg',
      text: 'This original Salt Lake City streetcar from the 1800s resides at the Daughters of Utah Pioneers Museum on Main Street in #SaltLakeCity. #TBT #ThrowBackThursday',
      date: 1360413309421
    },
    {
      service: 'instagram',
      account: 'slcairport',
      image: 'https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11856776_1632851626969972_1492883218_n.jpg',
      text: '<span class="section-text">A diversion from @denairport last night gave us a chance to see this beautiful @Lufthansa 747-400 #avgeek #SLC</span>',
      date: 1360413309421
    },
    {
      service: 'twitter',
      title: 'SaltLakeCity Council',
      account: '@slcCouncil',
      image: '',
      text: '<span class="section-text"><span class="twitter-user"><a href="https://www.twitter.com/slcCouncil"><strong>SaltLakeCity Council </strong>@slcCouncil</a></span>At tonight\'s meeting, the Council discussed a bond proposal and held a Truth in Taxation Hearing. Summary: <a href="http://t.co/lWKG3FobQ4">http://t.co/lWKG3FobQ4</a> #<a href="http://twitter.com/search/%23utpol">utpol</a></span>',
      date: 1360413309421
    },
    {
      service: 'twitter',
      account: 'slcmayorsoffice',
      image: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11358289_751601898299703_684513099_n.jpg',
      text: '<span class="section-text">#Repost @slcfarmersmarket Come down to Pioneer Park for the Tuesday Harvest Market! There\'s a beer garden, Bocce Ball, yoga, food trucks and the best produce in the state!</span>',
      date: 1360413309421
    },
    {
      service: 'twitter',
      title: 'SLC Police Dept',
      account: '@slcpd',
      text: '<span class="section-text"><span class="twitter-user"><a href="https://www.twitter.com/slcpd"><strong>SLC Police Dept. </strong>@slcpd</a></span>#<a href="http://twitter.com/search/%23WatchLog">WatchLog</a>: Tues, 8/11/15, Shooting, <a href="http://t.co/lMtahKsgIv">http://t.co/lMtahKsgIv</a></span>',
      date: 1360413309421
    },
    {
      service: 'newspaper-o',
      title: 'Inspiring Outdoor Stewards',
      account: '',
      image: '',
      text: '<span class="section-text">Salt Lake City was selected as one of the first 50 cities to participate in a nationwide movement to inspire and encourage the ...</span>',
      date: 1360413309421
    },
    {
      service: 'newspaper-o',
      title: 'SLCgreen is Hiring',
      text: '<span class="section-text">Title: Electric Vehicle Charging &amp;&nbsp;Clean Transportation Project Coordinator Duration: 15 – 20 hours per week for ...</span>',
      date: 1360413309421
    },
    {
      service: 'newspaper-o',
      title: 'Summary of the June 2 City Council Meeting',
      text: 'The Council continued its budget hearing, at which four people spoke. The Council will continue the public hearing to June 9 and will continue to discuss the Fiscal Year 2015-16 budget before adopting it in the coming weeks.',
      date: 1360413309421
    }
  ];

  $scope.shuffle = function() {
    $scope.$emit('iso-method', {name:'shuffle', params:null});
  }            
}])

.directive('socialWall', function factory($window, $browser, $http, $timeout) {
  return {
    restrict: 'A',
    controller: "SocialController",
    templateUrl: 'views/social.html',
    link: function($scope, $element, $attributes) {
      $timeout(function(){
        var imgLoad = imagesLoaded($element);
        imgLoad.on( 'always', function( instance ) {
          $element.find('[isotope-container]').isotope('reLayout');
        });
      }, 0);
    }
  }
})


// .directive('social', function factory($window, $browser, $http, Social) {
//   return {
//     restrict: 'A',
//     templateUrl: 'views/social.html',
//     /*scope: {
//       location: '='
//     },*/
//     link: function($scope, $element, $attributes) {
//       $scope.social = [{"name":"a","number":"1","date":"1360413309421","class":"purple"},{"name":"b","number":"5","date":"1360213309421","class":"orange"},{"name":"c","number":"10","date":"1360113309421","class":"blue"},{"name":"d","number":"2","date":"1360113309421","class":"green"},{"name":"e","number":"6","date":"1350613309421","class":"green"},{"name":"f","number":"21","date":"1350613309421","class":"orange"},{"name":"g","number":"3","date":"1340613309421","class":"blue"},{"name":"h","number":"7","date":"1330613309001","class":"purple"},{"name":"i","number":"22","date":"1360412309421","class":"blue"}];
//       console.log($scope.social);

//       $element.imagesLoaded().progress( function() {
//         $element.isotope('layout');
//       });

//       $scope.shuffle = function() {
//         $scope.$emit('iso-method', {name:'shuffle', params:null});
//       }
//     }
//   }
// })


