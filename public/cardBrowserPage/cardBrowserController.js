'use strict';

// public/core.js
var app = angular.module('myApp.cardBrowserController', []);



app.controller('cardBrowserController', ['$scope', 'DB', function ($scope, DB) {

    //Laad alle waarden van de decks etc van de DBService.
    $scope.playerDecks = [];

    $scope.cards = [];
    $scope.races;
    $scope.elements = [];
    $scope.types;
    $scope.roles;

    //vars local aan deze controller. Als je deck select worden deze geladen.
    $scope.deckList = [];
    $scope.deckElements;
    $scope.deckRace;

    //id van geselecteerde deck. word meegeven naar server.
    var deckId;

    if (DB.getDeckBuildProcess === true) {
        console.log('hij is hier');
        var deck = DB.getNewDeck();
        $scope.playerDecks.push(deck);
        $scope.deckElements = deck.elements;
        $scope.deckRace = deck.race;
        deckListFrame.style.display = 'inline-block';
    }


    //Laad alle data van de service in deze vars.
    function init() {
        DB.requestTypes().then(function (data) {
            $scope.types = data;
        });

        DB.requestRaces().then(function (data) {
            $scope.races = data;
        });

        DB.requestCards().then(function (data) {
            $scope.cards = data;
        });

        DB.requestRoles().then(function (data) {
            $scope.roles = data;
        });

        DB.requestElements().then(function (data) {
            $scope.elements = data;
        });
    };

    init();

    //set de css style van de cards naar de goede kleur van het element. in css staan classes die matchen met naam
    $scope.cardColor = function (deck) {
        return deck.element;
    };

    $scope.elementColor = function (element) {
        return element.element;
    };


    //deckbuildchecker kijkt of hij net uit deckbuilder komt. Dan moet hij dat deck laten zien.
    //betere manier: laat de decks op nieuw na de deckbuilder. save ID, load deck met dat ID.
    

    // socket.on('deckBuildCheckReturn', function (data) {
    //     //console.log(data.deck);
    //     if (data.bool) {
    //         deckListFrame.style.display = 'inline-block';
    //         $scope.deckList = data.deck.cards;
    //         deckId = data.deck._id;
    //         $scope.$apply();
    //     }
    //     threeOrMoreDecks();
    // });

    //als een player is ingelogd, laat decks zien, anders zeggen dat hij moet inloggen
    if (DB.getPlayerlogIn()) {
        console.log('player is logged in ');
        loginCheck.style.display = 'none';
        loginHider.style.display = 'inline-block';
        DB.requestDecks().then(function (data) {
            $scope.playerDecks = data;
            threeOrMoreDecks();
        });
    } else {
        console.log('not logged in');
        //socket.emit('loginCheck');
    }

    function threeOrMoreDecks() {
        var addNewDeck = document.getElementById("addNewDeck");
        if ($scope.playerDecks.length < 3) {
            addNewDeck.style.display = 'inline-block';

        } else {
            addNewDeck.style.display = 'none';
        }
    };



    $scope.showDeckList = function (deck) {
        //console.log(deck.race);
        //console.log(deck.elements);
        $scope.deckRace = deck.race;
        $scope.deckElements = deck.elements;

        deckId = deck._id;
        $scope.deckList = [];
        for (var i = 0; i < deck.cards.length; i++) {
            $scope.deckList.push(deck.cards[i]);
        }
        deckListFrame.style.display = 'inline-block';
        document.getElementById("iput-deckName").value = deck.deckName;
    };

    $scope.addToDeckList = function (card) {
        if ($scope.getTotalAmount(card) < 3) {
            $scope.deckList.push(card);
        }
    };

    // $scope.deleteDeck = function () {
    //     var deleteDeckName = document.getElementById("iput-deckName").value;
    //     socket.emit('deleteDeck', deleteDeckName)
    //     for (var i = 0; i < $scope.playerDecks.length; i++) {
    //         if (deleteDeckName === $scope.playerDecks[i].deckName) {
    //             console.log('in delete deck shizzle')
    //             $scope.playerDecks.splice([i], 1);
    //             $scope.$apply;
    //         }
    //     }
    //     threeOrMoreDecks();
    // };

    $scope.saveDeck = function () {
        var newDeckName = document.getElementById("iput-deckName").value;

        //socket.emit('saveDeck', { "deckList": $scope.deckList, "deckName": newDeckName, "deckId": deckId });
    };

    // socket.on('saveDeckReturn', function (data) {
    //     //console.log(data);
    //     for (var i = 0; i < $scope.playerDecks.length; i++) {
    //         if ($scope.playerDecks[i]._id === data._id) {
    //             $scope.playerDecks[i] = data;
    //         }
    //     }

    //     //$scope.playerDecks.push(data);
    //     $scope.$apply();
    //     threeOrMoreDecks();
    // });

    // socket.on('updateDeckReturn', function (data) {
    //     //console.log('deck updated in DB');
    // });

    $scope.getTotalAmount = function (card) {
        var total = 0;
        for (var i = 0; i < $scope.deckList.length; i++) {
            if (card.name === $scope.deckList[i].name) {
                total += 1;
            }
        }
        return total;
    }

    $scope.remove = function (card) {
        var index = $scope.deckList.indexOf(card);
        $scope.deckList.splice(index, 1);
    }

    //hier moet ook nog naar gekeken worden
    var raceToggle = false
    var elementToggle = false
    var typeToggle = false
    var roleToggle = false

    $scope.raceFilter = function (id) {
        //console.log(id);
        if (raceToggle === false) {
            document.getElementById(id.displayRace).style.backgroundColor = "#e0d87f";
            raceToggle = true;

            for (var i = 0; i < $scope.cards.length; i++) {
                console.log('checked race = ' + $scope.cards[i].race)
                if ($scope.cards[i].race != id.race) {
                    //console.log('removed race = ' + $scope.cards[i].race);
                    $scope.cards.splice([i], 1);
                    i--;
                }
            }

        } else {
            document.getElementById(id.displayRace).style.backgroundColor = "lightgray";
            raceToggle = false;

            DB.requestCards().then(function (data) {
                $scope.cards = data;
            });
        }
    }


    $scope.elementFilter = function (id) {
        //console.log(id);
        if (elementToggle === false) {
            document.getElementById(id).style.backgroundColor = "#e0d87f";
            elementToggle = true

            for (var i = 0; i < $scope.cards.length; i++) {
                //console.log('checked element = ' + $scope.cards[i].element)
                //console.log(id)
                if ($scope.cards[i].element != id) {
                    //console.log('removed element = ' + $scope.cards[i].element);
                    $scope.cards.splice([i], 1);
                    i--;
                }
            }

        } else {
            document.getElementById(id).style.backgroundColor = "lightgrey";
            elementToggle = false

            DB.requestCards().then(function (data) {
                $scope.cards = data;
            });
        }
    }


    $scope.typeFilter = function (id) {
        //console.log(id);
        if (typeToggle === false) {
            document.getElementById(id).style.backgroundColor = "#e0d87f";
            typeToggle = true

            for (var i = 0; i < $scope.cards.length; i++) {
                //console.log('checked type = ' + $scope.cards[i].type)
                if ($scope.cards[i].type != id) {
                    //console.log('removed type = ' + $scope.cards[i].type);
                    $scope.cards.splice([i], 1);
                    i--;
                }
            }
        } else {
            document.getElementById(id).style.backgroundColor = "lightgrey";
            typeToggle = false

            DB.requestCards().then(function (data) {
                $scope.cards = data;
            });
        }
    }


    $scope.roleFilter = function (id) {
        //console.log(id);
        if (roleToggle === false) {
            document.getElementById(id).style.backgroundColor = "#e0d87f";
            roleToggle = true

            for (var i = 0; i < $scope.cards.length; i++) {
                //console.log('checked role = ' + $scope.cards[i].role)
                if ($scope.cards[i].role != id) {
                    //console.log('removed role = ' + $scope.cards[i].role);
                    $scope.cards.splice([i], 1);
                    i--;
                }
            }

        } else {
            document.getElementById(id).style.backgroundColor = "lightgrey";
            roleToggle = false

            DB.requestCards().then(function (data) {
                $scope.cards = data;
            });
        }
    }
}

]);