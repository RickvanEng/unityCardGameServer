(function () {

    'use strict';

    angular
        .module('app')
        .controller('selectElementController', selectElementController);

    selectElementController.$inject = ['DBConnectionService', '$scope'];

    function selectElementController(DB, $scope) {

        var vm = this;

        vm.chosenElements = [];

        vm.allCards = [];
        vm.showCards = [];
        vm.elements = [];
        vm.elementInfo;

        DB.requestElements().then(function (data) {
            vm.elements = data;
        });

        DB.requestCards().then(function (data) {
            vm.allCards = data;
        });

        vm.addElement = function(element) {
            if (vm.chosenElements.length < 7) {
                vm.chosenElements.push(element);
            }
        };

        vm.explain = function(element) {
            vm.showCards = [];
            vm.elementInfo;

            for (var i = 0; i < vm.elements.length; i++) {
                if(vm.elements[i].element === element) {
                    vm.elementInfo = vm.elements[i].elementInfo;
                }
            }

            for (var i = 0; i < vm.allCards.length; i++) {
                if(vm.allCards[i].class.type === element) {
                    vm.showCards.push(vm.allCards[i]);
                }
            }            
        };



        // socket.on('getElementsReturn', function(data) {
        //     $scope.elements = data;
        //     for (var i = 0; i < $scope.elements.length; i++) {
        //         if($scope.elements[i].element === 'fire') {
        //             $scope.elementInfo = $scope.elements[i].elementInfo;
        //         }
        //     }
        //     $scope.$apply();
        // });
        
        // socket.on('loadDBCards-return', function(data) {
        //     $scope.allCards = data;
        //     for (var i = 0; i < $scope.allCards.length; i++) {
        //         if($scope.allCards[i].element === 'fire') {
        //             $scope.showCards.push($scope.allCards[i]);
        //         }
        //     }
        //     $scope.$apply();
        // });
        
        // $scope.addElement = function(element) {
        //     if ($scope.chosenElements.length < 7) {
        //         $scope.chosenElements.push(element);
        //     }
        // };

        //  $scope.removeElement = function(element) {
        //         var index =  $scope.chosenElements.indexOf(element);
        //         $scope.chosenElements.splice(index, 1);

        // };

        

        // $scope.filterStarts = function(amount) {
        //     var resultArray = [];

        //     for (var i = 0; i < $scope.showCards.length; i++) {
        //         if ($scope.showCards[i].class.level === 1) {
        //             resultArray.add($scope.showCards[i]);
        //         }
        //     }
        //     return resultArray;
        // };
        
        // $scope.startDeckBuild = function() {
        //     console.log($scope.chosenElements);
        //     DB.setNewDeck({'atri': 'elements', 'value': $scope.chosenElements});
        //     DB.setDeckBuildProcess(true);
        // };

	}
}());