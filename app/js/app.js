'use strict';

//***************************************

// Main Application

//***************************************

angular.module('app', [
  'ui.router',
  'drupalService',
  'seeClickFixService',
  'paymentService',
  'app.menu',
  'app.proudcity',
  'app.showcase',
  'app.lazyCompile',
  'app.social',
  //'app.faq',
  //'app.track',
  //'app.payment',
  //'app.googleNews',
  'app.proudcityImage',
  'app.map',
  'scrollTo',
  'metaInfo',
  'ngSanitize',
  'ngResource',
  //'ngAnimate',  // @todo: This was causing an error with the loading of templates in childrenDir.js ($scope.getTemplate)
  'google.places',
  'ngTouch',
  'iso.directives',
  'stripe.checkout',
  'angular-inview'
])

.run(
  [          '$rootScope', '$state', '$stateParams', 'metaInfo', '$window', '$location', 
    function ($rootScope,   $state,   $stateParams,   metaInfo,   $window,   $location) {

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
      $rootScope.currentSection = '';
      $rootScope.currentRoute = '';

      $rootScope.appUrl='';
      $rootScope.apiUrl='http://demo.helmcivic.com/';
      $rootScope.vocabularyVid=2;
      
      $rootScope.trackUrl="http://markaspot.helmcivic.com/georeport/v2";
      $rootScope.seeclickfixUrl="https://test.seeclickfix.com/api/v2/";

      $rootScope.mapboxAccessToken = 'pk.eyJ1IjoiYWxiYXRyb3NzZGlnaXRhbCIsImEiOiI1cVUxbUxVIn0.SqKOVeohLfY0vfShalVDUw';
      $rootScope.mapboxMap = 'albatrossdigital.lpkdpcjb';

      $rootScope.app_page_display = 'all';
      $rootScope.appPageDisplay = 'all';

      $rootScope.proudShowcaseKey = '325jk154hl3y8r2J34NRAasdfasdf';
      $rootScope.showcaseApiUrl='http://ui.dev.getproudcity.com/';

      $rootScope.proudcityApi='http://proud.dev.getproudcity.com/api/proudcity/';
      //$rootScope.proudcityApi='http://localhost:32800/api/proudcity/';
      $rootScope.proxyUrl = $rootScope.proudcityApi + 'proxy';
      $rootScope.paymentUrl = $rootScope.proudcityApi + 'invoice-example';

      //$rootScope.proudcityApi='http://www.getproudcity.com/vendor/api/city-image.php';
      
      // Share42 script
      //var share42 = document.createElement('script');
    
      // Apply meta data if available
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){

          $rootScope.startedActive = false;

          // Metatag info
          // ---------------------------------

          //If we have any incoming data
          if(toState.data) {
            // Set title
            var title = (toState.data.title && toState.data.title.length)
                      ? toState.data.title
                      : '';

            metaInfo.setTitle(title);

            // set description
            var description = (toState.data.description && toState.data.description.length)
                            ? toState.data.description
                            : '';

            metaInfo.setMetaDescription(description);

            // set keywords
            var keywords = (toState.data.keywords && toState.data.keywords.length)
                         ? toState.data.keywords
                         : [];

            metaInfo.setMetaKeywords(keywords, toState.data.keywordAppend);
          }
          // we're coming from a state with meta info, reset
          else if(fromState.data) {
            metaInfo.resetAll();
          }

          // Did we already load share42 script?
          /*if(!share42.src) {
            // Load sharing
            share42.src = '/vendor/share42.js';
            share42.type = 'text/javascript';
            share42.async = 'true';
            document.body.appendChild(share42);
          }*/
        }
      );

      $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){

          // send tracking
          if ($window.ga){
            $window.ga('send', 'pageview', { 
              page: $location.path(),
              title: toState.data && toState.data.title ? toState.data.title : 'ProudCity'
            });
          }

          // first time, and are we changing the main / secondary route
          if(fromState.name && fromState.name.length && _.get(toState, 'data.doScroll')) {
            $rootScope.scrollTo('main', null, true);
          }
        }
      );

      // Helper function detects the correct sub route to go to (for templating)
      $rootScope.goSubRoute = function(baseRoute, subRoute, baseName) {
        baseName = baseName == undefined ? 'base' : baseName;
        var stateName = baseRoute+'.'+subRoute;
        try {
          var state = $state.get(stateName);
          if (state == undefined || state == null) {
            throw "myException";
          }
        }
        catch(e) {
          stateName = baseRoute+'.'+baseName;
        }
        $state.go(stateName);
      }

      // Replaces current route name with a 
      // usable css class
      $rootScope.getPageSection = function() {
        var name = $rootScope.$state.current.name;
        // Same cycle? Return
        if(name == $rootScope.currentRoute) {
          return $rootScope.currentSection;
        }
        // New route, set current
        $rootScope.currentRoute = name;
        // Grab section name
        name = name 
             ? name.indexOf('.') > 0
               ? 'section-' + name.substring(0, name.indexOf('.'))
               : 'section-' + name
             : 'section';
        // Set current section
        $rootScope.currentSection = name;
        return name;
      }
		}
	]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider', 'metaInfoProvider', 'StripeCheckoutProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider,   metaInfoProvider, StripeCheckoutProvider) {

      // Set base meta info
      metaInfoProvider.setBaseTitle('ProudCity');
      metaInfoProvider.setBaseDescription('Digital government as a public service.');
      metaInfoProvider.setBaseKeywords('municipal website, city website, digital front door, opengov');

      // set location provider as regular urls
      $locationProvider.html5Mode(true);

      StripeCheckoutProvider.defaults({
        key: "pk_2Z9o15fO6InYzHSWk9GDeRmbuCWQ9"
      });

      // trailing slash and url re-rerouting
      /*$urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        var argPos = path.indexOf('/?');

        // check to see if the path already has a slash where it should be
        if (path.length > 1) {
          if(path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
          }
          else if(argPos > 0) {
            return path.replace('/?', '?');
          }

          return '/';
        }
      });*/

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      //$stateProvider

    }
  ]
);

