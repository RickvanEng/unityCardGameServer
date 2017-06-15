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
                    url: '/theGame',
                    templateUrl: '../pages/theGamePage/theGameInfo.html'
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


                .state('card', {
                    url: '/card',
                    template: 'card'
                });
        });
})();