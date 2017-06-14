(function () {

    'use strict';

    angular
        .module('app')
        .controller('cardContentController', cardContentController);

    cardContentController.$inject = ['cardBrowserService', '$scope'];

    function cardContentController(cardBrowserService, $scope) {

        var vm = this;

        vm.cards;

        init();
        function init() {
            cardBrowserService.requestCards().then(function (data) {
                vm.cards = data;
            });
        };

        $scope.$watch(cardBrowserService.getFilter(), function (newVal) {
            console.log("New Data", newVal);
        });

        // var vm = this;

        // //Laad alle waarden van de decks etc van de DBService.
        // vm.playerDecks = [];

        // vm.cards = [];

        // init();
        // function init() {
        //     cardBrowserService.requestCards().then(function (data) {
        //         vm.cards = data;
        //     });
        // };

        // //vars local aan deze controller. Als je deck select worden deze geladen.
        // vm.deckList = [];
        // vm.deckElements;
        // vm.deckRace;

        // //id van geselecteerde deck. word meegeven naar server.
        // var deckId;

        // if (cardBrowserService.getDeckBuildProcess === true) {
        //     console.log('hij is hier');
        //     var deck = cardBrowserService.getNewDeck();
        //     vm.playerDecks.push(deck);
        //     vm.deckElements = deck.elements;
        //     vm.deckRace = deck.race;
        //     deckListFrame.style.display = 'inline-block';
        // }

        // //set de css style van de cards naar de goede kleur van het element. in css staan classes die matchen met naam
        // vm.cardColor = function (deck) {
        //     return deck.element;
        // };

        // vm.elementColor = function (element) {
        //     return element.element;
        // };


        // //deckbuildchecker kijkt of hij net uit deckbuilder komt. Dan moet hij dat deck laten zien.
        // //betere manier: laat de decks op nieuw na de deckbuilder. save ID, load deck met dat ID.


        // // socket.on('deckBuildCheckReturn', function (data) {
        // //     //console.log(data.deck);
        // //     if (data.bool) {
        // //         deckListFrame.style.display = 'inline-block';
        // //         $scope.deckList = data.deck.cards;
        // //         deckId = data.deck._id;
        // //         $scope.$apply();
        // //     }
        // //     threeOrMoreDecks();
        // // });

        // //als een player is ingelogd, laat decks zien, anders zeggen dat hij moet inloggen
        // if (cardBrowserService.getPlayerlogIn()) {
        //     console.log('player is logged in ');
        //     loginCheck.style.display = 'none';
        //     loginHider.style.display = 'inline-block';
        //     cardBrowserService.requestDecks().then(function (data) {
        //         vm.playerDecks = data;
        //         threeOrMoreDecks();
        //     });
        // } else {
        //     console.log('not logged in');
        //     //socket.emit('loginCheck');
        // }

        // function threeOrMoreDecks() {
        //     var addNewDeck = document.getElementById("addNewDeck");
        //     if (vm.playerDecks.length < 3) {
        //         addNewDeck.style.display = 'inline-block';

        //     } else {
        //         addNewDeck.style.display = 'none';
        //     }
        // };



        // vm.showDeckList = function (deck) {
        //     //console.log(deck.race);
        //     //console.log(deck.elements);
        //     vm.deckRace = deck.race;
        //     vm.deckElements = deck.elements;

        //     deckId = deck._id;
        //     vm.deckList = [];
        //     for (var i = 0; i < deck.cards.length; i++) {
        //         vm.deckList.push(deck.cards[i]);
        //     }
        //     deckListFrame.style.display = 'inline-block';
        //     document.getElementById("iput-deckName").value = deck.deckName;
        // };

        // vm.addToDeckList = function (card) {
        //     if (vm.getTotalAmount(card) < 3) {
        //         vm.deckList.push(card);
        //     }
        // };

        // // $scope.deleteDeck = function () {
        // //     var deleteDeckName = document.getElementById("iput-deckName").value;
        // //     socket.emit('deleteDeck', deleteDeckName)
        // //     for (var i = 0; i < $scope.playerDecks.length; i++) {
        // //         if (deleteDeckName === $scope.playerDecks[i].deckName) {
        // //             console.log('in delete deck shizzle')
        // //             $scope.playerDecks.splice([i], 1);
        // //             $scope.$apply;
        // //         }
        // //     }
        // //     threeOrMoreDecks();
        // // };

        // vm.saveDeck = function () {
        //     var newDeckName = document.getElementById("iput-deckName").value;

        //     //socket.emit('saveDeck', { "deckList": $scope.deckList, "deckName": newDeckName, "deckId": deckId });
        // };

        // // socket.on('saveDeckReturn', function (data) {
        // //     //console.log(data);
        // //     for (var i = 0; i < $scope.playerDecks.length; i++) {
        // //         if ($scope.playerDecks[i]._id === data._id) {
        // //             $scope.playerDecks[i] = data;
        // //         }
        // //     }

        // //     //$scope.playerDecks.push(data);
        // //     $scope.$apply();
        // //     threeOrMoreDecks();
        // // });

        // // socket.on('updateDeckReturn', function (data) {
        // //     //console.log('deck updated in DB');
        // // });

        // vm.getTotalAmount = function (card) {
        //     var total = 0;
        //     for (var i = 0; i < vm.deckList.length; i++) {
        //         if (card.name === vm.deckList[i].name) {
        //             total += 1;
        //         }
        //     }
        //     return total;
        // }

        // vm.remove = function (card) {
        //     var index = vm.deckList.indexOf(card);
        //     vm.deckList.splice(index, 1);
        // }

        // //hier moet ook nog naar gekeken worden
        // var raceToggle = false
        // var elementToggle = false
        // var typeToggle = false
        // var roleToggle = false

        // vm.raceFilter = function (id) {
        //     //console.log(id);
        //     if (raceToggle === false) {
        //         document.getElementById(id.displayRace).style.backgroundColor = "#e0d87f";
        //         raceToggle = true;

        //         for (var i = 0; i < vm.cards.length; i++) {
        //             console.log('checked race = ' + vm.cards[i].race)
        //             if (vm.cards[i].race != id.race) {
        //                 //console.log('removed race = ' + $scope.cards[i].race);
        //                 vm.cards.splice([i], 1);
        //                 i--;
        //             }
        //         }

        //     } else {
        //         document.getElementById(id.displayRace).style.backgroundColor = "lightgray";
        //         raceToggle = false;

        //         cardBrowserService.requestCards().then(function (data) {
        //             vm.cards = data;
        //         });
        //     }
        // }


        // vm.elementFilter = function (id) {
        //     //console.log(id);
        //     if (elementToggle === false) {
        //         document.getElementById(id).style.backgroundColor = "#e0d87f";
        //         elementToggle = true

        //         for (var i = 0; i < vm.cards.length; i++) {
        //             //console.log('checked element = ' + $scope.cards[i].element)
        //             //console.log(id)
        //             if (vm.cards[i].element != id) {
        //                 //console.log('removed element = ' + $scope.cards[i].element);
        //                 vm.cards.splice([i], 1);
        //                 i--;
        //             }
        //         }

        //     } else {
        //         document.getElementById(id).style.backgroundColor = "lightgrey";
        //         elementToggle = false

        //         cardBrowserService.requestCards().then(function (data) {
        //             vm.cards = data;
        //         });
        //     }
        // }


        // vm.typeFilter = function (id) {
        //     //console.log(id);
        //     if (typeToggle === false) {
        //         document.getElementById(id).style.backgroundColor = "#e0d87f";
        //         typeToggle = true

        //         for (var i = 0; i < vm.cards.length; i++) {
        //             //console.log('checked type = ' + $scope.cards[i].type)
        //             if (vm.cards[i].type != id) {
        //                 //console.log('removed type = ' + $scope.cards[i].type);
        //                 vm.cards.splice([i], 1);
        //                 i--;
        //             }
        //         }
        //     } else {
        //         document.getElementById(id).style.backgroundColor = "lightgrey";
        //         typeToggle = false

        //         cardBrowserService.requestCards().then(function (data) {
        //             vm.cards = data;
        //         });
        //     }
        // }


        // vm.roleFilter = function (id) {
        //     //console.log(id);
        //     if (roleToggle === false) {
        //         document.getElementById(id).style.backgroundColor = "#e0d87f";
        //         roleToggle = true

        //         for (var i = 0; i < vm.cards.length; i++) {
        //             //console.log('checked role = ' + $scope.cards[i].role)
        //             if (vm.cards[i].role != id) {
        //                 //console.log('removed role = ' + $scope.cards[i].role);
        //                 vm.cards.splice([i], 1);
        //                 i--;
        //             }
        //         }

        //     } else {
        //         document.getElementById(id).style.backgroundColor = "lightgrey";
        //         roleToggle = false

        //         cardBrowserService.requestCards().then(function (data) {
        //             vm.cards = data;
        //         });
        //     }
        // }
    }

}());