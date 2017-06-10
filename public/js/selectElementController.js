var app = angular.module('myApp.selectElementController', ['DBService']);

app.controller('selectElementController', [ '$scope', 'DB', 
	function($scope, DB) {

        $scope.chosenElements = [];

        $scope.allCards = [];
        $scope.showCards = [];
        $scope.elements = [];
        $scope.elementInfo;

        DB.requestElements().then(function (data) {
            console.log('elements = ' + data);
            $scope.elements = data;
        });

        DB.requestCards().then(function (data) {
            console.log('cards = ' + data);
            $scope.allCards = data;
        });

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
        
        $scope.addElement = function(element) {
            if ($scope.chosenElements.length < 7) {
                $scope.chosenElements.push(element);
            }
        };

         $scope.removeElement = function(element) {
                var index =  $scope.chosenElements.indexOf(element);
                $scope.chosenElements.splice(index, 1);

        };

        $scope.explain = function(element) {
            $scope.showCards = [];
            $scope.elementInfo;

            for (var i = 0; i < $scope.elements.length; i++) {
                if($scope.elements[i].element === element) {
                    $scope.elementInfo = $scope.elements[i].elementInfo;
                }
            }

            for (var i = 0; i < $scope.allCards.length; i++) {
                if($scope.allCards[i].class.type === element) {
                    $scope.showCards.push($scope.allCards[i]);
                }
            }            
        };

        $scope.filterStarts = function(amount) {
            var resultArray = [];

            for (var i = 0; i < $scope.showCards.length; i++) {
                if ($scope.showCards[i].class.level === 1) {
                    resultArray.add($scope.showCards[i]);
                }
            }
            return resultArray;
        };
        
        $scope.startDeckBuild = function() {
            console.log($scope.chosenElements);
            DB.setNewDeck({'atri': 'elements', 'value': $scope.chosenElements});
            DB.setDeckBuildProcess(true);
        };




	}
]);