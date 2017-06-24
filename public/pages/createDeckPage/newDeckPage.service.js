(function () {
    'use strict';

    angular
        .module('app')
        .service('newDeckPageService', newDeckPageService, );

    newDeckPageService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService'];

    function newDeckPageService($q, $http, DBService, logService) {

        var vm = this;

        //deze houd bij of er een deck word gebuild. heeft gemaakt met het laden van de deckBrowserController
        vm.deckBuilder = false;
        vm.deckID;
        vm.newDeck = {
            "deckOwner": "",
            "deckName": "",
            "race": "",
            "elements": [

            ],
            "cards": [

            ]
        };

        vm.saveDeck = function () {
            // console.log('saveDeck')
            // console.log(vm.newDeck)
            return $http.post('/saveDeck', { 'deck': vm.newDeck });
        };
    }
}());





