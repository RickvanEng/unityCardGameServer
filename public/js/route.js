//Deze file is de wegwijzer van alle pagina's op die site. Deze linked de partials aan de main site.

var app = angular.module('myApp', ['ngRoute','myApp.cardBrowserController', 'myApp.playMenuController', 'myApp.selectElementController', 'myApp.gameWindowController', 
                                     'myApp.theGameController', 'myApp.cardBrowserController', 'myApp.homeController', 'myApp.selectRaceController', 'myApp.indexController']);
                                     
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/card', {
        templateUrl : 'card',
        controller: '',
    })
      .when('/home', {
        templateUrl : 'home',
        controller: 'homeController'
    })
    .when('/cardBrowser', {
        templateUrl : 'cardBrowser',
        controller: 'cardBrowserController'
    })
    .when('/lore', {
        templateUrl : 'lore',
        controller: 'loreController'
    })
    .when('/theGameInfo', {
        templateUrl : 'theGameInfo',
        controller: 'theGameController'
    })
    .when('/playMenu', {
        templateUrl : 'playMenu',
        controller: 'playMenuController'
    })
    .when('/gameWindow', {
        templateUrl : 'gameWindow',
        controller: 'gameWindowController'
    })
    .when('/selectRace', {
        templateUrl : 'selectRace',
        controller: 'selectRaceController'
    })
    .when('/selectElement', {
        templateUrl : 'selectElement',
        controller: 'selectElementController'
    })
}]);