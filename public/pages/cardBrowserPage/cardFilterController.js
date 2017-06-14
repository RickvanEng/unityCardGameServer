(function () {

    'use strict';

    angular
        .module('app')
        .controller('cardFilterController', cardFilterController);

    cardFilterController.$inject = ['cardBrowserService'];

    function cardFilterController(cardBrowserService) {

        var vm = this;

        vm.cardTypes;
        vm.cardRaces;
        vm.cardRoles;
        vm.cardElements;

        init();
        function init() {
            cardBrowserService.requestTypes().then(function (data) {
                vm.cardTypes = data;
            });

            cardBrowserService.requestRaces().then(function (data) {
                vm.cardRaces = data;
            });

            cardBrowserService.requestRoles().then(function (data) {
                vm.cardRoles = data;
            });

            cardBrowserService.requestElements().then(function (data) {
                vm.cardElements = data;
            });
        };


        /*
        Deze filter doet:
        ophalen filter array en kijken of geslecteerde filterobject er al in staat
        zo ja, haal hem eruit en broadcast naar cardContentController
        zo nee, voeg hem toe en broadcast naar cardContentController
        Die filterd op de toegevoegde elementen en laat alleen die zien.
        */

        vm.filter = function (para1, para2) {
            cardBrowserService.setFilter(para1, para2);
        }


    }
}());