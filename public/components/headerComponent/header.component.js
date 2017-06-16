(function() {
    'use strict';

    angular
        .module('app')
        .component('headerComponent', headerComponent());

    function headerComponent() {
        return {
            bindings: {
                signIn: '&',
                signUp: '&',
                signOut: '&',
                var: '<'
            },
            templateUrl: '../components/headerComponent/header.component.html'
        };
    }
}());