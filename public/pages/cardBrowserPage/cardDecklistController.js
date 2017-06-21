(function () {

    'use strict';

    angular
        .module('app')
        .controller('cardDecklistController', cardDecklistController);

    cardDecklistController.$inject = ['cardBrowserService', 'loginService', '$scope', 'newDeckPageService'];

    function cardDecklistController(cardBrowserService, logService, $scope, newDeckService) {

        var vm = this;

        //vars voor decklist stuk 
        vm.playerDecks;
        vm.cardList = [];
        vm.deckName = '';

        //vars voor card content stukje.
        vm.cardTypes;
        vm.cardRaces;
        vm.cardRoles;
        vm.cardElements;
        vm.cards = [];
        //parameters voor filter
        var filterActive = false;
        //array met card die word geshowed op pagina
        vm.showCards = [];

        var deckID;

        init();
        function init() {
            cardBrowserService.requestTypes().then(function (data) {

                vm.cardTypes = data;
            });

            cardBrowserService.requestRaces().then(function (data) {
                vm.cardRaces = data;
            });

            cardBrowserService.requestRoles().then(function (data) {
                vm.cardRoles = data;
            });

            cardBrowserService.requestElements().then(function (data) {
                vm.cardElements = data;
            });

            cardBrowserService.requestCards().then(function (data1) {
                vm.cards = data1;
            });

            cardBrowserService.requestCards().then(function (data1) {
                vm.showCards = data1;
            });

        };

        if (logService.getLoggedPlayer()) {
            var user = logService.getLoggedPlayer();
            var decklist = document.getElementById('deckList');
            cardBrowserService.requestDecks(user).then(function (data) {
                vm.playerDecks = data.data.value;
                deckList.style.display = 'inline';
                //threeOrMoreDecks();
            });
        } else {
            console.log('not logged in');
            //socket.emit('loginCheck');
        }

        vm.showDeckList = function (deck) {
            vm.cardList = [];
            vm.cardList = deck.cards;
            vm.deckName = deck.deckName;
            deckID = deck._id;
        }

        vm.getTotalAmount = function (card) {
            var total = 0;
            for (var i = 0; i < vm.cardList.length; i++) {
                if (card.name === vm.cardList[i].name) {
                    total += 1;
                }
            }
            return total;
        }

        vm.addToDeckList = function (card) {
            if (vm.getTotalAmount(card) < 3) {
                vm.cardList.push(card);
            }
        };

        vm.remove = function (card) {
            var index = vm.cardList.indexOf(card);
            vm.cardList.splice(index, 1);
        }



        //Content waar de cards in geladen worden!

        vm.filter = function (category, subject) {
            if (filterActive) {
                filterActive = false;
                cardBrowserService.requestCards().then(function (data1) {
                    vm.showCards = data1;
                });
            } else {
                filterActive = true;
                for (var i = 0; i < vm.showCards.length; i++) {
                    switch (category) {
                        case 'race':
                            if (vm.showCards[i].race !== subject) {
                                vm.showCards.splice([i], 1);
                                i--;
                            }
                            break;
                        case 'type':
                            console.log('in type')
                            if (vm.showCards[i].type !== subject) {
                                vm.showCards.splice([i], 1);
                                i--;
                            }
                            break;
                        case 'role':
                            console.log('in role')
                            if (vm.showCards[i].role !== subject) {
                                vm.showCards.splice([i], 1);
                                i--;
                            }
                            break;
                        case 'element':
                            console.log('in element')
                            if (vm.showCards[i].element !== subject) {
                                vm.showCards.splice([i], 1);
                                i--;
                            }
                            break;
                    }
                }
            }
        }

        //set de css style van de cards naar de goede kleur van het element. in css staan classes die matchen met naam
        vm.cardColor = function (element) {
            console.log('gets called')
            return element;
        };

        vm.elementColor = function (element) {
            return element.element;
        };

        vm.saveDeck = function () {
            var deckToSave;
            for (var i = 0; i < vm.playerDecks.length; i++) {
                if (deckID === vm.playerDecks[i]._id) {
                    deckToSave = vm.playerDecks[i];
                    deckToSave.cards = vm.cardList;
                    deckToSave.deckName = vm.deckName;
                }
            }



            cardBrowserService.saveDeck(deckToSave).then(function (data) {
                console.log('data saved');
            });
        };
    }
}());