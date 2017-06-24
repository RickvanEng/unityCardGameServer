(function() {
    'use strict';

    angular
        .module('app')
        .component('cardComponent', cardComponent());

    function cardComponent() {
        return {
            bindings: {
                card: '<',
                cardColor: '&'
            },
            templateUrl: '../components/cardComponent/card.component.html'
        };
    }
}());