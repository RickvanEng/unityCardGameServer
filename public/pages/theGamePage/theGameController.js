(function () {

    'use strict';

    angular
        .module('app')
        .controller('gameInfoController', gameInfoController);

    gameInfoController.$inject = ['$window'];

    function gameInfoController($window) {

        console.log('gameInfoController Loaded');

        var vm = this;

        vm.title;
        vm.content;

        vm.openWindow = function() {
            $window.open('//facebook.com');
        }



        // vm.buttonClick = function (info) {
        //     gameService.getContent(info).then(function (data) {
        //         vm.title = data[0].title;
        //         vm.content = data[0].content;
        //     });
        // };
    }

}());