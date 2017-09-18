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
        //lijst met cards in deck
        vm.cardList = [];

        vm.deckName = '';
        vm.deckElements = [];

        //vars voor card filter.
        vm.cardTypes;
        vm.cardRaces;
        vm.cardRoles;
        vm.cardElements;

        //parameters voor filter
        var filterActive = false;
        //array met card die word geshowed op pagina

        //origineele card array
        vm.cards = [];

        //cards die worden laten zien met filter applied
        vm.showCards = [];

        vm.filterArray = [];

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

            cardBrowserService.requestAllCards().then(function (data) {
                vm.cards = data;
                vm.showCards = data;
            });
        };

        if (logService.getLoggedPlayer() !== '') {
            var user = logService.getLoggedPlayer();
            var decklist = document.getElementById('deckList');
            cardBrowserService.requestDecks(user).then(function (data) {
                vm.playerDecks = data.data.value;
                deckList.style.display = 'inline';

                if (newDeckService.deckBuilder) {
                    newDeckService.deckBuilder = false;
                    newDeckService.newDeck.deckOwner = '';
                    newDeckService.newDeck.deckName = '';
                    newDeckService.newDeck.race = '';
                    newDeckService.newDeck.elements = [];
                    newDeckService.newDeck.cards = [];
                };
                //dit laad het deck wat net is aangemaakt in de decklist
                for (var x = 0; x < vm.playerDecks.length; x++) {
                    if (vm.playerDecks[x]._id === newDeckService.deckID) {
                        vm.showDeckList(vm.playerDecks[x]);
                        //vm.deckElements
                    }
                }

            });
        } else {
            console.log('not logged in');
        }

        vm.showDeckList = function (deck) {
            vm.cardList = [];
            vm.cardList = deck.cards;
            vm.deckName = deck.deckName;
            vm.deckElements = deck.elements;
            deckID = deck._id;
            console.log(vm.deckElements[0])
            vm.filter('element', vm.deckElements[0].element);
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
            vm.showCards = [];
            for (var i = 0; i < vm.cards.length; i++) {
                switch (category) {
                    case 'race':
                        if (vm.cards[i].class.race === subject) {
                            vm.showCards.push(vm.cards[i]);
                        }
                        break;
                    case 'type':
                        if (vm.cards[i].type === subject) {
                            vm.showCards.push(vm.cards[i]);
                        }
                        break;
                    case 'role':
                        if (vm.cards[i].role === subject) {
                            vm.showCards.push(vm.cards[i]);
                        }
                        break;
                    case 'element':
                        if (vm.cards[i].element === subject) {
                            if (vm.deckElements.length > 0) {
                                if (vm.cards[i].class.level <= calculateElementLevel(subject)) {
                                    vm.showCards.push(vm.cards[i]);
                                }
                            } else {
                                vm.showCards.push(vm.cards[i]);
                            }
                        }
                        break;
                }
            }
        }

        function calculateElementLevel(element) {
            var amount = 0;
            for (var i = 0; i < vm.deckElements.length; i++) {
                if (vm.deckElements[i].element === element) {
                    amount++;
                }
            }
            return amount;
        }


        // if (filterActive) {
        //     filterActive = false;
        //     for (var x = 0; x < vm.filterArray.length; x++) {
        //         vm.showCards.push(vm.filterArray[x]);
        //         vm.filterArray.splice([x], 1);
        //         x--;
        //     }
        //     // cardBrowserService.requestAllCards().then(function (data1) {
        //     //     vm.showCards = data1;
        //     // });
        // } else {
        //     filterActive = true;
        // }


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
                // console.log('data saved');
            });
        };

        vm.cardColor = function (deck) {
            return deck.element;
        };

        vm.elementColor = function (element) {
            return element.element;
        };

        vm.deleteDeck = function () {
            cardBrowserService.deleteDeck(deckID).then(function (data) {
                for (var i = 0; i < vm.playerDecks.length; i++) {
                    if (vm.playerDecks[i]._id === data.data.value) {
                        vm.playerDecks.splice([i], 1);
                    }
                }

                vm.cardList = [];
                vm.deckName = '';
                vm.deckElements = [];

            });
        };
    }
}());