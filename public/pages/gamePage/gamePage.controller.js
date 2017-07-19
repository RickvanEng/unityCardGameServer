(function () {

    'use strict';

    angular
        .module('app')
        .controller('gamePageController', gamePageController);

    gamePageController.$inject = ['$window', 'gamePageService'];

    function gamePageController($window, gameService) {

        console.log('gamePageController Loaded');

        var vm = this;
        vm.message = gameService.messageFunction();


    }

}());