'use strict';


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

        .state("settings", {
          url: '/settings',
          templateUrl: 'views/settings/settings.html',
          resolve: {
            'sections': function($stateParams, Node) {
              return [
                {
                  key: 'config',
                  title: 'Site Settings',
                  img: 'helmcivic.png',
                  desc: 'Complete city website',
                  id: 198
                },
                {
                  key: 'social',
                  title: 'Social Accounts',
                  img: 'dkan.svg',
                  desc: 'Open data platform'
                },
                {
                  key: 'payments',
                  title: 'Payments',
                  img: 'govpress.png',
                  desc: 'Wordpress theme for Government'
                },
                {
                  key: 'open311',
                  title: 'Open 311',
                  img: 'markaspot.png',
                  desc: 'Public Civic Issue Tracking'
                },
                {
                  key: 'map',
                  title: 'Map',
                  img: 'thinkup.png',
                  desc: 'Social media insight'
                },
                {
                  key: 'agencies',
                  title: 'Agencies',
                  img: 'thinkup.png',
                  desc: 'Social media insight'
                }
              ];
            }
          },
          controller: function($scope, $rootScope, $state, $filter, $http, Node, sections){
            $scope.sections = sections;
          }
        })

        .state("settings.config", {
          url: '/config',
          templateUrl: 'views/settings/config.html',
          resolve: {
            'sections': function($stateParams, Node) {
              return [
                {
                  key: 'config',
                  title: 'Site Settings',
                  img: 'helmcivic.png',
                  desc: 'Complete city website',
                  id: 198
                },
                {
                  key: 'social',
                  title: 'Social Accounts',
                  img: 'dkan.svg',
                  desc: 'Open data platform'
                },
                {
                  key: 'payments',
                  title: 'Payments',
                  img: 'govpress.png',
                  desc: 'Wordpress theme for Government'
                },
                {
                  key: 'open311',
                  title: 'Open 311',
                  img: 'markaspot.png',
                  desc: 'Public Civic Issue Tracking'
                },
                {
                  key: 'map',
                  title: 'Map',
                  img: 'thinkup.png',
                  desc: 'Social media insight'
                },
                {
                  key: 'agencies',
                  title: 'Agencies',
                  img: 'thinkup.png',
                  desc: 'Social media insight'
                }
              ];
            }
          },
          controller: function($scope, $rootScope, $state, $filter, $http, Node, sections){
            $scope.sections = sections;
          }
        })


    }
  ]
)
