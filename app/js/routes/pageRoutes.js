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
        
        .state("home", {
          url: '/',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/home.html',
          controller: function($scope, $rootScope, $state, $filter){

          }
        })

        .state("start", {
          url: '/start',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/start.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("about", {
          url: '/about',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/about.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("pricing", {
          url: '/pricing',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/pricing.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("contact", {
          url: '/contact',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/contact.html',
          controller: function($scope, $rootScope, $state, $filter, $http){
            $scope.form = {};
            $scope.status = false;

            $scope.submit = function(form) { 
              $http.post($rootScope.proudcityApi + 'contact', form).then(function(response) {
                $scope.status = 'thanks';
              }, function(response) {
                $scope.status = 'error';
              });
            }
          }
        })

        .state("support", {
          url: '/support',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/support.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("developers", {
          url: '/developers',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/developers.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("careers", {
          url: '/careers',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/careers.html',
          controller: function($scope, $rootScope, $state, $filter){
          }
        })

        .state("features", {
          url: '/features',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/features.html',
          controller: function($scope, $rootScope, $state, $filter){

            $scope.primary = [ // @todo: better solution
              {
                title: 'Resident-focused',
                icon: '',
                desc: 'ProudCity focuses on the needs of your residents. Emphasizing search and employing analytics to get your residents where they need to go in as few steps as possible.',
              },
              {
                title: 'Mobile-friendly',
                icon: '',
                desc: 'Mobile, tablet, desktop, TV, kiosk. Your website will be functional and beautiful no matter the format.',
              },
              {
                title: 'Secure and reliable',
                icon: '',
                desc: 'We host in secure data centers with up-to-date software, scheduled backups and all pages served over https for ultimate privacy. ',
              },
              {
                title: 'Web-based content management',
                icon: '',
                desc: 'We use an enterprise-class CMS built to manage million-page websites. Our content editor, media manager and drag-and-drop interface empowers anyone to easily manage their digital services.',
              }
            ];

            $scope.primary2 = [
              {
                title: 'Cloud hosted',
                icon: '',
                desc: 'ProudCity is a cloud-based, OpenSaaS platform. We manage your website hosting so you and your IT department can focus on more important work.',
              },
              {
                title: 'SLA support',
                icon: '',
                desc: 'To ensure peace of mind, we provide 99.9% uptime guarantee and 24/7 phone support.',
              },
              {
                title: 'Universal updates',
                icon: '',
                desc: 'We update the ProudCity platform are pushed to your website automatically, and without expensive upgrade fees.',
              },
              {
                title: 'Flexible migration',
                icon: '',
                desc: 'Our Content Liftoff integration makes importing agency websites -- from MS Word, Google Drive or an existing website -- a collaborative, painless experience.',
              }
            ];

            $scope.primary3 = [
              {
                title: 'Issue reporting',
                icon: '',
                desc: 'Our issue reporting tool lets residents quickly report a problem with location and photos from any device.',
              },
              {
                title: 'Agency websites',
                icon: '',
                desc: 'Empower agencies with their own websites while remaining under the city’s umbrella by centralizing permissions and content workflow.',
              },
              {
                title: 'Administrative permissions and workflow',
                icon: '',
                desc: 'Manage internal user permissions and email alerts as content moves from draft to to published.',
              },
              {
                title: 'Accessibility',
                icon: '',
                desc: 'Addressing the needs of all residents is important. Our structured markup meets Web Content Accessibility Guidelines Working Group (WCAG) level 2 standards.',
              },
              {
                title: 'Web analytics dashboard',
                icon: '',
                desc: 'Integration with Google Analytics brings insights into traffic trends and popular content and helps you better understand how residents are using your site.',
              },
              {
                title: 'Services map',
                icon: '',
                desc: 'Highlight services -- fire, schools, parks, city administration -- on a pre-populated map with data from Foursquare. We can also integrate with other content such as public transit, events and hiking maps.',
              },
              {
                title: '100% data and code export',
                icon: '',
                desc: 'ProudCity is an open source project, licensed under GNU General Public License, version 2 or later. At anytime, you can export your database and files to host elsewhere.',
              },
              {
                title: '3rd party integrations',
                icon: '',
                desc: 'ProudCity integrates with (a growing list of) applications, making it easy to add popular and civic-specific services to your digital government platform (see integrations).',
              },
              {
                title: 'Flexible onboarding and transitioning',
                icon: '',
                desc: 'Baked into our 3-step process you’ll have a Beta standing next to your legacy website to ensure a smooth transition to your new government digital services.',
              },
              {
                title: 'Elicit Feedback',
                icon: '',
                desc: 'Built into our Answers app we allow for residents’ questions to be responded to.',
              },
              {
                title: 'Community',
                icon: '',
                desc: 'We’re building out a ProudCity Slack community to  create a knowledge-base for government  digital services. <a href="/contact">Request an invite today</a>.',
              },
              {
                title: 'SEO best practices',
                icon: '',
                desc: 'Markup is standards-compliant and rich with SEO metatags and social integration.  Google Analytics is  built in to keep track of results and make iterative improvements.',
              },
              {
                title: 'Solr search with Google integration',
                icon: '',
                desc: 'Our smart autocomplete helps visitors find what they are looking for instantly.  For deeper searches a customized, embedded version of Google searches all of your city\'s subsites.',
              },
              {
                title: 'Media embedding',
                icon: '',
                desc: 'Easily upload and add video, audio and photos to your mobile responsive web pages.',
              },
              {
                title: 'Integrate existing branding',
                icon: '',
                desc: 'Like each ProudCity, your branding is unique to your city. ProudCity empowers you to integrate branding in 30 seconds instead of 6 months. ',
              },
              {
                title: 'Document archive and library',
                icon: '',
                desc: 'Not everything is online so having a document repository of City Council Minutes, Regulations and Forms  to search, view, share or print is a must have digital service.',
              },
              {
                title: 'Webforms',
                icon: '',
                desc: 'Having intuitive online forms for residents starts with the ability for city staff to easily build and manage webforms on their own.',
              },
              {
                title: 'Open API',
                icon: '',
                desc: 'In the spirit of being open and flexible ProudCity is architected to easily integrate with Open APIs. See our <a href="/developers">developer page</a> for more detail.',
              }
            ];

          }
        })

        .state("integrations", {
          url: '/integrations',
          data: { 
            doScroll: true  // Scrolls on route change
          },
          templateUrl: 'views/integrations.html',
          controller: function($scope, $rootScope, $state, $filter){
            $scope.services = {
              '311': [
                {
                  title: 'SeeClickFix',
                  image: 'seeclickfix.png',
                  desc: 'Create new issue, lookup issue, view issues on map'
                },
                {
                  title: 'Mark-a-Spot',
                  image: 'markaspot.png',
                  desc: 'Create new issue, lookup issue, view issues on map'
                },
                {
                  title: 'Open311',
                  image: 'open311.png',
                  desc: 'Lookup issue, view issues on map'
                },
              ],
              'Payments': [
                {
                  title: 'Stripe',
                  image: 'stripe.png',
                  desc: 'Process online payments and automate the payment processing workflow'
                },
                {
                  title: 'Legacy',
                  image: 'payment-link.png',
                  desc: 'Link to your existing payment provider'
                }
              ],
              'Social media': [
                {
                  title: 'Twitter',
                  image: 'twitter.png',
                  desc: 'View social media across multiple accounts on a social wall'
                },
                {
                  title: 'Instagram',
                  image: 'instagram.png',
                  desc: 'View social media across multiple accounts on a social wall'
                },
                {
                  title: 'Facebook',
                  image: 'facebook.png',
                  desc: 'View social media across multiple accounts on a social wall'
                },
                {
                  title: 'YouTube',
                  image: 'youtube.png',
                  desc: 'View social media across multiple accounts on a social wall'
                },
                {
                  title: 'RSS',
                  image: 'rss.png',
                  desc: 'Display new from multiple sources on a social wall. Import existing site news and press releases.'
                },
                {
                  title: 'iCal',
                  image: 'ical.png',
                  desc: 'Display upcoming events on a social wall. Import existing events to a centralized city calendar.'
                },
              ],
              'Mapping': [
                {
                  title: 'MapBox',
                  image: 'mapbox.png',
                  desc: 'Create a map that\'s as unique as your city'
                },
                {
                  title: 'Foursquare',
                  image: 'foursquare.png',
                  desc: 'Pre-populate a map with your most popular municipal services'
                },
              ],
              'Administration': [
                {
                  title: 'Google Analytics',
                  image: 'googleanalytics.png',
                  desc: 'View traffic details and site trends directly from the administration dashboard'
                },
                {
                  title: 'Flickr',
                  image: 'flickr.png',
                  desc: 'Search for and add Creative Commons-licensed photography in the CMS'
                },
                {
                  title: 'Google Drive',
                  image: 'googledrive.png',
                  desc: 'Import content from Google Docs, add files from Google Drive'
                },
                {
                  title: 'Content Liftoff',
                  image: 'contentliftoff.png',
                  desc: 'Quickly architect, import and manage agency subsites'
                },
              ],
              'Search': [
                {
                  title: 'Apache Solr',
                  image: 'solr.png',
                  desc: 'Instant, advanced suggestive search with the open source industry leader'
                },
                {
                  title: 'Google Search',
                  image: 'google.png',
                  desc: 'Let visitors search all of your agency subsites with a customized Google Search'
                }
              ],
              'Translate': [
                {
                  title: 'Google Translate',
                  image: 'googletranslate.png',
                  desc: 'Quickly add baseline translations for free'
                }
              ],
            }
          }
        })

    }
  ]
)
