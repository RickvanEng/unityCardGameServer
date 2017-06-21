(function () {
    'use strict';

    angular
        .module('app')
        .service('newDeckPageService', newDeckPageService, );

    newDeckPageService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService'];

    function newDeckPageService($q, $http, DBService, logService) {

        var vm = this;

        vm.deckBuilder = false;
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
            console.log('saveDeck')
            return $http.post('/saveDeck', { 'deck': vm.newDeck });
        };
    }
}());





