(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('history',{
                url:'/history',
                templateUrl:'history/index.html',
                controller:'History.IndexController',
                controllerAs: 'vm',
                data:{ activeTab: 'history'}
            })
            .state('requirements',{
                url:'/requirements',
                templateUrl:'requirements/index.html',
                controller:'Requirements.IndexController',
                controllerAs: 'vm',
                data:{ activeTab: 'requirements'}
            })
            .state('specifications',{
                url:'/specifications',
                templateUrl:'specifications/index.html',
                controller:'Specifications.IndexController',
                controllerAs: 'vm',
                data:{ activeTab: 'specifications'}
            })
            .state('pre',{
                url:'/pre',
                templateUrl:'pre/index.html',
                controller:'Pre.IndexController',
                controllerAs: 'vm',
                data:{ activeTab: 'pre'}
            })
            .state('custom',{
                url:'/custom',
                templateUrl:'custom/index.html',
                controller:'Custom.IndexController',
                controllerAs: 'vm',
                data:{ activeTab: 'custom'}
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();