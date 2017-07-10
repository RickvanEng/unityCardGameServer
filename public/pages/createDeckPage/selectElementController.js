(function () {

    'use strict';

    angular
        .module('app')
        .controller('selectElementController', selectElementController);

    selectElementController.$inject = ['DBConnectionService', '$scope', 'newDeckPageService', '$location'];

    function selectElementController(DB, $scope, newDeckService, $location) {

        var vm = this;

        vm.chosenElements = [];

        vm.allCards = [];
        vm.showCards = [];
        vm.elements = [];
        vm.elementInfo;

        newDeckService.requestElements().then(function (data) {
            vm.elements = data;
        });

        newDeckService.requestAllCards().then(function (data) {
            //console.log(JSON.stringify(data));
            vm.allCards = data;
        });

        vm.addElement = function (element) {
            if (vm.chosenElements.length < 7) {
                vm.chosenElements.push(element);

                var elements_id;

                for (var i = 0; i < vm.elements.length; i++) {
                    if (vm.elements[i].element === element) {
                        elements_id = vm.elements[i]._id;
                        console.log('id = ' + vm.elements[i]._id)
                    }
                }
                newDeckService.newDeck.elements.push(elements_id);
            }
        };

        vm.saveDeck = function () {
            console.log('saving deck: ' + JSON.stringify(newDeckService.newDeck));
        };

        //stukje legt wat uit over het element. 
        vm.explain = function (element) {
            vm.showCards = [];
            vm.elementInfo;

            for (var i = 0; i < vm.elements.length; i++) {
                if (vm.elements[i].element === element) {
                    vm.elementInfo = vm.elements[i].elementInfo;
                }
            }

            for (var i = 0; i < vm.allCards.length; i++) {
                if (vm.allCards[i].class.type === element) {
                    vm.showCards.push(vm.allCards[i]);
                }
            }
        };

        vm.saveBeforeNavigate = function () {
            //dit moet met promise, eerst saven dan pas verder gaan. anders is hij nog niet gesaved terwijl volgende page al geload word
            if (newDeckService.newDeck.elements.length === 7) {

                newDeckService.saveDeck().then(function (data) {
                    console.log(data.data.value);
                    newDeckService.deckID = data.data.value;
                    $location.path('/cardBrowser');
                })
            }
        }





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