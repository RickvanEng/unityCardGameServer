var async = require('async');

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['users', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

var cardDao = require("../database/card.dao.js");

var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

var allCards = loadAllCards();

module.exports.getTypes = function (req, res) {
    db.types.find({}, function (err, res1) {
        if (res1) {
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

module.exports.getRoles = function (req, res) {
    db.roles.find({}, function (err, res1) {
        if (res1) {
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

module.exports.getRaces = function (req, res) {
    db.races.find({}, function (err, res1) {
        if (res1) {
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

module.exports.getElements = function (req, res) {
    db.elements.find({}, function (err, res1) {
        if (res1) {
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

module.exports.getLores = function (req, res) {
    db.content.find({ docName: 'raceLores' }, function (err, res1) {
        if (res1) {
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

//loads all cards from DB and loads adjacent values
function loadAllCards(req, res) {
    cardDao.getAllCards(function (res1) {
        allCards = res1;

        async.forEach(allCards, function (card, callback) {
            
            cardDao.getCardRace(card.race, function (raceRes) {
                card.race = raceRes[0];
            });

            cardDao.getCardElement(card.element, function (elementRes) {
                card.element = elementRes[0];
            });

            cardDao.getCardRole(card.role, function (roleRes) {
                card.role = roleRes[0];
            });

            cardDao.getCardType(card.type, function (typeRes) {
                card.type = typeRes[0];
            });

            cardDao.getCardClassElement(card.class.type, function (classTypeRes) {
                card.class.type = classTypeRes[0];
            });

            callback();

        }, function () {
            console.log('cards loaded');
        });
    });
};

module.exports.getAllCards = function (req, res) {
    console.log(allCards);
    return sendResponse(res, 200, { "status": "succes", "value": allCards });
};

module.exports.updateDeck = function (req, resMain) {
    console.log('incoming deck: ' + req.body.deck);
    var deckCards = [];
    for (var i = 0; i < req.body.deck.cards.length; i++) {
        deckCards.push(req.body.deck.cards[i]._id);
    }
    var id = req.body.deck._id;
    var newDeckName = req.body.deck.deckName;


    db.decks.update({ "_id": ObjectId(id) }, { $set: { deckName: newDeckName, cards: deckCards } }, { multi: true }, function (err, res) {
        db.decks.find({ "_id": ObjectId(id) }, function (err, deck) {

            var array = [];
            async.forEach(deck.cards, function (item, callback) {
                cardDao.getDecksCardsFromDB(item, function (card) {
                    array.push(card[0]);
                    callback();
                });
                //Stuur het hele object terug naar de controller.
            }, function () {
                deck.cards = array;
                return sendResponse(resMain, 200, { "status": "succes", "value": deck });

            });
        });
    });
};

module.exports.saveDeck = function (req, resMain) {
    db.decks.insert({
        "deckOwner": req.body.deck.deckOwner,
        "deckName": req.body.deck.deckName,
        "race": req.body.deck.race,
        "elements": req.body.deck.elements,
        "cards": req.body.deck.cards
    },
        function (err, res) {
            if (res) {
                console.log(res)
                return sendResponse(resMain, 200, { "status": "succes", "value": res._id });
            } else {
                console.log(err)
                return sendResponse(resMain, 400, { "status": "failure", "value": 'niet gelukt!' });
            }
        });


};

module.exports.getUserDecks = function (req, res) {
    var counter = 0;
    cardDao.getDecksFromDB(req.body.username, function (decks) {
        if (decks) {
            async.forEach(decks, function (deck, callback) {


                cardDao.getDeckRace(deck.race, function (race) {
                    deck.race = race[0];
                    cardDao.getDeckElements(deck.elements, function (elements) {
                        deck.elements = elements;
                        getCardsInDeck(deck.cards, function (cards) {
                            deck.cards = cards;
                            callback();
                        });
                    });
                });

            }, function () {
                for (var i = 0; i < decks[0].cards.length; i++) {
                    console.log(decks[0].cards[i].name + " : "  +  JSON.stringify(decks[0].cards[i].role));
                }
                sendResponse(res, 200, { "status": "succes", "value": decks });
            });
        }
    });
};

getCardsInDeck = function (cardIDArray, cb) {
    var resultArray = [];
    for (var i = 0; i < cardIDArray.length; i++) {
        for (var x = 0; x < allCards.length; x++) {
            if (cardIDArray[i] == allCards[x]._id) {
                resultArray.push(allCards[x]);
            }
        }
    }
    cb(resultArray);
}

module.exports.deleteDeck = function (req, res) {
    console.log('id = ' + req.body.deckID)

    db.decks.remove({ '_id': ObjectId(req.body.deckID) }, function (err, res1) {
        if (res1) {
            console.log(res1);
            sendResponse(res, 200, { "status": "succes", "value": req.body.deckID });
        } else {
            console.log(err);
            sendResponse(res, 200, { "status": "error", "value": 'niet gleukt' });
        }
    });
};

//create card function (stats en abilities)
//get all abilities (Battlecry, last wish, etc)

