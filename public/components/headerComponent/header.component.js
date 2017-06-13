(function() {
    'use strict';

    angular
        .module('app')
        .component('myInput', myInput());

    function myInput() {
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