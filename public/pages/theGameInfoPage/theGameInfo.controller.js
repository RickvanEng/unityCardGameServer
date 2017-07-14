(function () {

    'use strict';

    angular
        .module('app')
        .controller('gameInfoController', gameInfoController);

    gameInfoController.$inject = ['$window', 'loginService', 'cardBrowserService', 'DBConnectionService', 'gamePageService'];

    function gameInfoController($window, logService, cardBrowserService, DBService, gamePageService) {

        console.log('gameInfoController Loaded');

        var vm = this;

        vm.title;
        vm.content;
        vm.playerDecks = [];

        if (logService.getLoggedPlayer() !== '') {
            var user = logService.getLoggedPlayer();
            cardBrowserService.requestDecks(user).then(function (data) {
                console.log(data.data.value)
                vm.playerDecks = data.data.value;
            });
        }

        vm.enterQue = function() {
            console.log('wtf?')
            gamePageService.enterQue();
        }

        vm.selectDeck = function(deck) {
            DBService.chosenDeck = deck;
        }
 
    }

}());