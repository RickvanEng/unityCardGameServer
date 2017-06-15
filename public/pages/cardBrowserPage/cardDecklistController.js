(function () {

    'use strict';

    angular
        .module('app')
        .controller('cardDecklistController', cardDecklistController);

    cardDecklistController.$inject = ['cardBrowserService'];

    function cardDecklistController(cardBrowserService) {

        var vm = this;

        vm.isPlayerLoggedIn = false;

        init();
        function init() {
            // cardBrowserService.getLoggedPlayer().then(function (res) {
            //     console.log(res)
            //     vm.isPlayerLoggedIn = res;
            // });

            // vm.isPlayerLoggedIn = cardBrowserService.getLoggedPlayer();
            // console.log(vm.isPlayerLoggedIn);
        }

        if (cardBrowserService.getLoggedPlayer()) {
            console.log('player is logged in ');
            // loginCheck.style.display = 'none';
            var decklist = document.getElementById('deckList');
            deckList.style.display = 'inline';
            // cardBrowserService.requestDecks().then(function (data) {
            //     vm.playerDecks = data;
            //     threeOrMoreDecks();
            // });
        } else {
            console.log('not logged in');
            //socket.emit('loginCheck');
        }

    }
}());