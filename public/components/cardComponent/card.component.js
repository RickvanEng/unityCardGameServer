(function() {
    'use strict';

    angular
        .module('app')
        .component('cardComponent', cardComponent());

    function cardComponent() {
        return {
            bindings: {
                card: '<'
            },
            templateUrl: '../components/cardComponent/card.component.html'
        };
    }
}());