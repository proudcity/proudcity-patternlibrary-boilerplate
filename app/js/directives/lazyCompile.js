'use strict';

angular.module('app.lazyCompile', [
])

.directive('compile', ['$compile', function ($compile) {
  return {
    scope: {
      compile: '='
    },
    link: function(scope, element, attrs) {
      var voidCompile = scope.$watch('compile', function(value) {
        if(value && value != "false") {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          $compile(element.contents())(scope);

          // Use un-watch feature to ensure compilation happens only once.
          voidCompile();
        }
      });
    }
  }
}]);