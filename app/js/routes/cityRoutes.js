'use strict';

angular.module('app')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      // Redirect if on city hompage
      $urlRouterProvider.when(/get\/[a-zA-z]*\/[a-zA-z]*$/i, ['$match', '$stateParams', function ($match, $stateParams) {
        return $match.input + '/answers';
      }]);

      $stateProvider

        .state("city", {
          url: '/get/:state/:city',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/city.html',
          controller: function($scope, $rootScope, $state, $filter, $http){

            $scope.mapCompile = false;
            $scope.socialCompile = false;
            $scope.formShown = false;
            $scope.searchActive = false;
            $scope.activeModal = false;

            var ucWords = function(str) {
              return (str + '')
                .replace('\-', ' ')
                .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
                  return $1.toUpperCase();
                });
            }

            $scope.location = {
              state: ucWords($state.params.state),
              city: ucWords($state.params.city),
              key: {
                state: $state.params.state,
                city: $state.params.city
              }
            }


            $scope.settings = {
              color: {
                main: '#000',
                secondary: '#000',
                highlight: '#2196F3'
              },
              header: {
                backgroundType: 'image',
                backgroundImage: '',
                backgroundColor: '',
                searchColor: '#FFFFFF',
                searchAlign: 'left'
              }
            }

            $http.get($rootScope.proudcityApi +'?state='+ $state.params.state +'&city='+ $state.params.city).success(function(data){
              $scope.location = {
                city: data.city,
                county: data.county,
                state: data.state
              };
              
              angular.extend($scope.settings, data);
              console.log(JSON.stringify($scope.settings));
            });

            // Render map directive lazily
            $scope.showMap = function($event, $inview, $inviewpart) {
              // Gotta wait for the lat long
              if($scope.settings.lat) {
                $scope.mapCompile = '<div foursquare-map="$parent.settings"></div>';
              }
            }

            // Render social directive lazily
            $scope.showSocial = function($event, $inview, $inviewpart) {
              $scope.socialCompile = '<div social-wall></div>';
            }

            $scope.customizeClick = function() {
              // @todo: better way, Alex
              $('html, body').animate({
                scrollTop: 0
              }, 1000);
              // @todo: fix this
              //$('#customize').trigger('click');
            }

            $scope.modal = function(e) {
              $scope.toggleModal('getInvolved', e);
              e.preventDefault();
              //$state.go('city.modal');
            }

            // Show
            $scope.toggleModal = function(type, $event) {
              $rootScope.startedActive = $rootScope.startedActive ? false : true;
              $scope.activeModal = type;
              
              if($event) {
                $event.preventDefault();
              }
              else {
                return true;
              }
            }

            $scope.openModal = function(type, $event) {
              $rootScope.startedActive = true;
              $scope.activeModal = type;
            }

            $scope.searchFocus = function() {
              $scope.searchActive = true;
            }

            $scope.searchAutocomplete = function(text) {
              //$('html, body').animate({
              //  scrollTop: $('#wrapper-search').offset().top - 70
              //}, 1000);
              $scope.autocomplete = [
                {
                  icon: 'usd',
                  title: 'Pay my water bill',
                  route: 'city.payments.type',
                  data: {nid: 32}
                },
                {
                  icon: 'question-circle',
                  title: 'How do I get a marriage license?',
                  route: 'city.faq.child',
                  data: {tid: 19}
                },
                {
                  icon: 'usd',
                  title: 'Pay a parking ticket',
                  route: 'city.payments.type',
                  data: {nid: 33}
                },
                {
                  icon: 'question-circle',
                  title: 'How do I get a copy of a birth certificate?',
                  route: 'city.faq.child',
                  data: {tid: 59}
                },
                {
                  icon: 'exclamation-triangle',
                  title: 'File a complaint',
                  route: 'city.report'                
                }
              ]
            }

            $scope.searchAutocompleteClick = function(item) {
              console.log(item);
              $scope.searchClose();
              $('html, body').animate({
                scrollTop: $('#wrapper-311').offset().top - 70
              }, 1000);
              $state.go(item.route, item.data);
            }

            $scope.searchClose = function() {
              $scope.searchActive = false;
            }

            $scope.lucky= function() {
              var cities = [
                {'city': 'Kennebunkport', 'state': 'Maine'},
                {'city': 'Gainesville', 'state': 'Florida'},
                {'city': 'Huntsville', 'state': 'Alabama'},
                {'city': 'State-College', 'state': 'Pennysylvania'},
                {'city': 'Oakland', 'state': 'California'},
                {'city': 'Walpole', 'state': 'Massachusetts'},
                {'city': 'Sisters', 'state': 'Oregon'},
                {'city': 'Pueblo', 'state': 'Colorado'},
                {'city': 'Denver', 'state': 'Colorado'},
                {'city': 'Corvallis', 'state': 'Oregon'},
                {'city': 'Albuquerque', 'state': 'New-Mexico'},
              ];
              var city = cities[Math.floor(Math.random()*cities.length)];
              console.log(city);
              $state.go('city', city);
            }
          }
        })

        .state("city.modal", {
         url: '/start',
          templateUrl: 'views/city-modal.html',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          controller: function($scope, $rootScope, $state, $filter, $http){
          }
        })



    }
  ]
);