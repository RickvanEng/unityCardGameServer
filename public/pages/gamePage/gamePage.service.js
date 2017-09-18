(function () {
    'use strict';

    angular
        .module('app')
        .service('gamePageService', gamePageService, );

    gamePageService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService', '$location', '$window', '$timeout'];

    function gamePageService($q, $http, DBService, logService, $location, $window, $timeout) {

        var vm = this;
        var socket = io();

        vm.chosenDeck;

        vm.message = 'Loading...';
        vm.messageFunction = function () {
            return vm.message;
        }

        vm.enterQue = function () {
            //commit deck and enter search for player que
            console.log(vm.chosenDeck)
            socket.emit('enterQue', vm.chosenDeck);
        }

        socket.on('matchFound', function (data) {
            console.log('binnen!');
            console.log(data.deck);

        });

        // socket.on('test', function (data) {
        //     console.log('wat')
        //     console.log(data.name);
        //     vm.message = data.name;
        //     $timeout();
        // });

        // $timeout(function () {
        //     $location.url('/gamePage/game');
        // })
    }
}());





