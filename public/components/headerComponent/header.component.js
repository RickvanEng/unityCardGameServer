(function() {
    'use strict';

    angular
        .module('app')
        .component('headerComponent', headerComponent());

    function headerComponent() {
        return {
            bindings: {
                // nameLabel: '@',
                // namePlaceholder: '@',
                // ageLabel: '@',
                // agePlaceholder: '@',
                // onClick: '&',
                // blaVar: '@'
            },
            templateUrl: '../components/headerComponent/header.component.html'
        };
    }
}());