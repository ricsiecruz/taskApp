// Create our angular module 
//configuration

var App = angular.module('app', [
    'ngStorage',
    'ui.router',])

App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$uibTooltipProvider', '$sceDelegateProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $uibTooltipProvider, $sceDelegateProvider) {
        // Tooltips and Popovers configuration
        $httpProvider.interceptors.push('interceptor');
        $uibTooltipProvider.options({
            appendToBody: true
        });
        // Router configration
        $urlRouterProvider.otherwise('/main');
        // $urlRouterProvider.when('/settings', '/settings/basic-profile');
        // $urlRouterProvider.when('/admin/', '/admin/dashboard');
        // $urlRouterProvider.when('/admin', '/admin/dashboard');
        // $sceDelegateProvider.resourceUrlWhitelist([
        //     // Allow same origin resource loads.
        //     'self',
        //     // Allow loading from our assets domain.  Notice the difference between * and **.
        //     'https://countryapi.gear.host/**'
        // ]);

        $stateProvider
            .state('task', {
                url: '/task',
                views: {
                    // 'header': {
                    //     templateUrl: 'assets/views/header.html',
                    //     controller: 'MainHeaderCtrl'
                    // },
                    'main': {
                        templateUrl: 'assets/task.group.detailed.html',
                        // controller: 'MainCtrl'
                    },
                    // 'footer': {
                    //     templateUrl: 'assets/views/footer.html'
                    // }
                }, 
                 data:{
                    requiresUserLogin: false
                },
            })
           }
          ]
         )