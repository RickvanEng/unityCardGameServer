(function () {
    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            // For any unmatched url, redirect to home
            
            
            $urlRouterProvider.otherwise("/home");
            // States
            $stateProvider

                .state('home', {
                    url: '/home',
                    templateUrl: '../pages/homePage/home.html'
                })
                .state('theGame', {
                    url: '/theGameInfo',
                    templateUrl: '../pages/theGameInfoPage/theGameInfo.html'
                })
                .state('cardBrowser', {
                    url: '/cardBrowser',
                    templateUrl: '../pages/cardBrowserPage/cardBrowser.html'
                })
                .state('createDeck', {
                    url: '/createDeck',
                    templateUrl: '../pages/createDeckPage/createDeckMainPage.html'
                })
                .state('createDeck.selectRace', {
                    url: '/selectRace',
                    templateUrl: 'pages/createDeckPage/partials/selectRace.html'
                })
                .state('createDeck.selectElement', {
                    url: '/selectElement',
                    templateUrl: 'pages/createDeckPage/partials/selectElement.html'
                })
                
                .state('gamePage', {
                    url: '/gamePage',
                    templateUrl: '../pages/gamePage/gamePage.html'
                })

                .state('gamePage.loading', {
                    url: '/loading',
                    templateUrl: '../pages/gamePage/partials/gameloading.html'
                })

                .state('gamePage.game', {
                    url: '/game',
                    templateUrl: '../pages/gamePage/partials/game.html'
                })

                

                .state('home.home1', {
                    url: '/home1',
                    templateUrl: '../pages/homePage/homePartials/home1.html',
                    // controller: function ($scope) {
                    //     $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                    // }
                })

                // nested list with just some random string data
                .state('home.home2', {
                    url: '/home2',
                    template: '<my-input></my-input>'
                })
        });
})();