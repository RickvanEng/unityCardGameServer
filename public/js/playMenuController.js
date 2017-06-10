var app = angular.module('myApp.playMenuController', ['DBService', 'ngCookies']);

app.controller('playMenuController', ['$scope', 'DB', '$window', '$compile', '$cookies',
    function ($scope, DB, $window, $compile, $cookies) {
        console.log('playmenu controller');

        $scope.openWindow = function () {
            $window.open('#gameWindow', '', 'width=1680,height=1050');
        };

        $scope.playerDecks = [];

        $scope.selectedDeck;

        if (DB.getPlayerlogIn()) {
            main.style.display = 'none';
            mainAccepted.style.display = 'inline-block';
            DB.requestDecks().then(function (data) {
                $scope.playerDecks = data;
                console.log($scope.playerDecks.length);
            });
        } else {
            console.log('sending log in check!');
            //socket.emit('loginCheck');
        }

        $scope.selectDeck = function (deck) {
            console.log(deck.deckName);
            $scope.selectedDeck = deck;

        }

        $scope.getTotalAmount = function (name) {
            if ($scope.selectedDeck != null) {
                //console.log($scope.selectedDeck.cards[0]);
                var total = 0;
                for (var i = 0; i < $scope.selectedDeck.cards.length; i++) {
                    if (name === $scope.selectedDeck.cards[i].name) {
                        total += 1;
                    }
                }
                return total;
            }
        }

        // $scope.getTotalAmount = function(card){
        // var total = 0;
        // if (selectedDeck != null) {
        //     for (var i = 0; i < $scope.selectedDeck.cards.length; i++) {
        //         if (card.name === $scope.selectedDeck.cards[i].name) {
        //             total += 1;
        //         }
        //     }
        // }
        // return total;
        // }
    }
]);