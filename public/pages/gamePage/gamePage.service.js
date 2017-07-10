(function () {
    'use strict';

    angular
        .module('app')
        .service('gamePageService', gamePageService, );

    gamePageService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService', '$location'];

    function gamePageService($q, $http, DBService, logService, $location) {

        var vm = this;
        var socket = io();

        vm.message = 'Loading...';
        vm.messageFunction = function() {
            return vm.message;
        }

        socket.on('matchFound', function () {
            $location.path('/gamePage/game');
        });

        vm.connect = function() {
            socket.emit('update');
        }

    }
}());





