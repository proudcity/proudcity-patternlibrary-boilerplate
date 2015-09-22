'use strict';

angular.module('app.proudcity', [
])

.directive('proudcityHeader', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityHeader.html',
    link: function($scope, $rootScope, $element) {
      $scope.mainMenu = [
        {title: 'Features', state: 'features'},
        {title: 'Integrations', state: 'integrations'},
        {title: 'Pricing', state: 'pricing'},
        //{title: 'About', state: 'about'},
        //{title: 'Support', state: 'support'}
        {title: 'Contact', state: 'contact'}
        // Blog
        // Get Started
      ];
      console.log($scope.menu);
    }
  }
})


.directive('proudcityFooter', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityFooter.html',
    scope: {
      'hideForm': '@'
    },
    link: function($scope, $rootScope, $element) {
      $scope.footerMenu = [
        {title: 'Features', state: 'features'},
        {title: 'Integrations', state: 'integrations'},
        {title: 'Pricing', state: 'pricing'},
        {title: 'About', state: 'about'},
        {title: 'Careers', state: 'careers'},
        {title: 'Contact', state: 'contact'}
        // Blog
        // Get Started
      ];
    }
  }
})



.directive('proudcitySignup', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcitySignup.html',
    link: function($scope, $rootScope, $element) {
      $scope.form = {};
      $scope.status = false;

      $scope.submit = function(form) { 
        // @todo: why do we need to use $scope.$parent.$parent and not $rootScope?
        form.city = $scope.location.city;
        form.state = $scope.location.state;
        $http.post($scope.$parent.$parent.proudcityApi + 'signup', form).then(function(response) {
          $scope.status = 'thanks';
        }, function(response) {
          $scope.status = 'error';
        });
      }
    }
  }
})




.directive('proudcityStyle', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityStyle.html',
    link: function($scope, $rootScope, $element) {
      
    }
  }
})



.directive('proudcityGetInvolved', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityGetInvolved.html',
    link: function($scope, $rootScope, $element) {
      
    }
  }
})


.directive('proudcityStart', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    templateUrl: 'views/proudcityStart.html',
    link: function($scope, $rootScope, $element) {
      $scope.preview = function() {
        if ($scope.location.address_components != undefined) {
          $scope.$parent.$state.go('city', {city: $scope.location.address_components[0].long_name.replace(' ', '-'), state: $scope.location.address_components[2].long_name.replace(' ', '-')});
        }
      }

      $scope.location = null;

      $scope.autocompleteOptions = {
        componentRestrictions: { country: 'us' },
        types: ['(cities)']
      }

    }
  }
})

.directive('getStarted' , ['$rootScope', function($rootScope) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      // listen for a click
      $element.on('click', function() {
        $rootScope.startedActive = ($rootScope.startedActive) ? false : true;
        $rootScope.$apply();
      });
    }
  }
}])
