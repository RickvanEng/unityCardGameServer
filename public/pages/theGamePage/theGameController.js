(function () {

    'use strict';

    angular
        .module('app')
        .controller('gameInfoController', gameInfoController);

    gameInfoController.$inject = [];

    function gameInfoController() {

        console.log('gameInfoController Loaded');

        var vm = this;

        vm.title;
        vm.content;

        // vm.buttonClick = function (info) {
        //     gameService.getContent(info).then(function (data) {
        //         vm.title = data[0].title;
        //         vm.content = data[0].content;
        //     });
        // };
    }

}());