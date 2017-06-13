(function() {

    'use strict';

    angular 
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope'];

    function homeController($scope) {

        var vm = this;

        console.log('homeController loaded');

        vm.testVar = 'hallo een homecontroller';
        vm.mainTitle;
        vm.mainContent;

        var test = function() {
                console.log('testClick');
        }


    }

}());