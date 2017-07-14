(function () {
    'use strict';

    angular
        .module('app')
        .service('gamePageService', gamePageService, );

    gamePageService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService', '$location', '$window'];

    function gamePageService($q, $http, DBService, logService, $location, $window) {

        console.log('loaded zooi');

        var vm = this;
        var socket = io();

        vm.chosenDeck;

        vm.message = 'Loading...';
        vm.messageFunction = function() {
            return vm.message;
        }

        vm.enterQue = function() {
            console.log('wtf 2')
            //commit deck and enter search for player que
            socket.emit('enterQue', vm.chosenDeck);
        }

        socket.on('matchFound', function () {
            console.log('binnen!');
            socket.emit('commitDeck', )
        });
    }
}());





