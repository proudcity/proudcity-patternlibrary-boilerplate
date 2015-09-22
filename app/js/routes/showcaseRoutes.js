'use strict';

// @todo: better solution
var services = [
  {
    key: 'helmcivic',
    title: 'Helm Civic',
    img: 'helmcivic.png',
    desc: 'Complete city website',
    id: 198
  },
  {
    key: 'dkan',
    title: 'dkan',
    img: 'dkan.svg',
    desc: 'Open data platform'
  },
  {
    key: 'govpress',
    title: 'GovPress',
    img: 'govpress.png',
    desc: 'Wordpress theme for Government'
  },
  {
    key: 'markaspot',
    title: 'Markaspot',
    img: 'markaspot.png',
    desc: 'Public Civic Issue Tracking'
  },
  {
    key: 'thinkup',
    title: 'ThinkUp',
    img: 'thinkup.png',
    desc: 'Social media insight'
  }
  /*
  {
    key: 'piwik',
    title: 'Piwik',
    img: 'piwik.svg',
    desc: 'Opensource web analytics'
  },
  */
];

angular.module('app.showcase', [
  'ui.router' 
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      

      $stateProvider
        /*.state("showcase", {
          url: '/showcase',
          templateUrl: 'views/showcase/showcase.html',
          resolve: {
            nodes: function($stateParams, Node) {
              return Node.query().$promise.then(function(data) {
                return data.list;
              });
            }
          },
        })*/


        .state("showcase", {
          url: '/showcase',
          templateUrl: 'views/showcase/showcase.html',
          controller: function($scope, $rootScope, $state, $filter, $http){
            $scope.services = services;

            $scope.evaluate = function(key) {
              $state.go('form', {app: key});
              //$state.go('showcase.'+ key);
            }

          }
        })

        .state("form", {
          url: '/showcase/try/:app',
          templateUrl: 'views/showcase/form.html',
          resolve: {
            nodes: function($stateParams, Node) {
              return Node.query().$promise.then(function(data) {
                return data.list;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $filter, $http, Node){
            $scope.key = $state.params.app;
            $scope.site = {key: $scope.key};
            $scope.getTemplate = function() {
              return 'views/showcase/form/'+ $scope.key +'.html';
            }

            // Get token
            // @todo: move this into service
            if ($rootScope.token == undefined) {
              $http({
                url: $rootScope.showcaseApiUrl + 'restws/session/token?key='+ $rootScope.proudShowcaseKey,
                method: 'GET',
                requestType: 'text'
              }).success(function(data) {
                $rootScope.token = data;
              });
            }

            /*$scope.getMachineName = function() {
              $scope.machineName = !$scope.machineNameFocused || $scope.machineName == '' ? $scope.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() : $scope.machineName;
              Node.query({
                'type': 'site',
                field_machine_name: $scope.machineName
              }, function(data) {
                if (data.list.length) {
                  $scope.machineNameClass = 'has-error';
                }
                else {
                  $scope.machineNameClass = 'has-success';
                }
              })
            }*/

            $scope.changeLocation = function() {
              if ($scope.site.location.address_components != undefined) {
                var city = $scope.site.location.address_components[0].long_name;
                $scope.site.siteName = $scope.site.siteName == undefined || $scope.site.siteName == '' ? city : $scope.site.siteName;
                $scope.site.machineName = $scope.site.machineName == undefined || $scope.site.machineName == '' ? city.toLowerCase().replace(' ', '-') : $scope.site.machineName;               
              }
            }


            $scope.submit = function(site) {
              if ($scope.machineNameClass == 'has-error') {
                alert('Sorry, your machine name is already taken.');
                return;
              }
              

              var params = {
                type: 'environment',
                field_env_app: {id: 198},
                title: site.machineName,
                field_env_email: $scope.mail,
                //lat: $scope.location.geometry != undefined ? $scope.location.geometry.location.A : null,
                //lng: $scope.location.geometry != undefined ? $scope.location.geometry.location.F : null,
              };

              $http({
                url: $rootScope.showcaseApiUrl + 'node',
                method: 'POST',
                requestType: 'text',
                headers: {
                  'X-CSRF-Token': $rootScope.token
                },
                data: params
              }).error(function(data) {
                alert('Oops, we ran into an issues. Please contact hello@helmcivic.com and we\'ll get you set up ASAP.');
              }).success(function(data) {
                console.log(data);
                $state.go('loading', {app: site.key, nid: data.nid});
              });

            }

            var serialize = function(obj) {
              var str = [];
              for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
              return str.join("&");
            }
          }
        })

        .state("loading", {
          url: '/showcase/try/:app/loading/:nid',
          templateUrl: 'views/showcase/loading.html',
          controller: function($scope, $rootScope, $state, $filter, $http, $timeout){
            $scope.getTemplate = function() {
              return 'views/showcase/loading/'+ $scope.key +'.html';
            }

            $scope.progressValue = 0;
            $timeout(function(){
              $scope.progressValue = 90;
            }, 2000);
          }
        })



    }
  ]
)
