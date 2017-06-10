// module.exports = {
//   foo: function () {
//     // whatever
//   },
//   bar: function () {
//     // whatever
//   }
// };

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['players', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;
var async = require('async');




module.exports.getAllCards = function (cb) {
    db.cards.find({}, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}



module.exports.getCardRace = function (raceId, cb) {
    db.races.find({ _id: raceId }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}

module.exports.getCardElement = function (elementId, cb) {
    db.elements.find({ _id: elementId }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}

module.exports.getCardRole = function (roleId, cb) {
    db.roles.find({ _id: roleId }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}

module.exports.getCardType = function (typeId, cb) {
    db.types.find({ _id: typeId }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}

module.exports.getCardClassElement = function (elementId, cb) {
    db.elements.find({ _id: elementId }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}


module.exports.isValidPassword = function (data, cb) {
    db.players.find({ username: data.username, password: data.password }, function (err, res) {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

module.exports.isUsernameTaken = function (data, cb) {
    db.account.find({ username: data.username }, function (err, res) {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

module.exports.isDeckNameTaken = function (newDeckName, playerName, cb) {
    //console.log('in isDeckNameTaken method');
    db.decks.find({ deckName: newDeckName, deckOwner: playerName }, function (err, res) {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

//DELETE FUNCTIONS

module.exports.deleteDeckFromDB = function (newDeckName, playerName, cb) {
    //console.log('in deleteDeck method');
    db.decks.update({ deckName: newDeckName, deckOwner: playerName }, { $unset: { cards: 1 } }, { multi: true }, function (err, res) {
        if (res)
            cb(true);
        else
            cb(false);
    });
}


//SAVE FUNCTIONS

module.exports.insertDeckInDB = function (newDeckName, playerName, cards, cb) {
    //console.log('in insertDeck method');
    db.collection('decks').insert({
        "deckOwner": playerName,
        "deckName": newDeckName,
        "cards": cards
    }
    )
};

module.exports.saveNewUser = function (userName, password, cb) {
    //console.log('in save Player method');
    db.collection('players').insert({"username": userName, "password": password
    }
    )
};

//GET FUNCTIONS

module.exports.getDecksFromDB = function (name, cb) {
    db.decks.find({ deckOwner: name }, function (err, res) {
        if (res.length > 0) {
            cb(res);
        }
    });
}

module.exports.getSingleDeck = function (nameOfPlayer, nameOfDeck, cb) {
    db.decks.find({ deckOwner: nameOfPlayer, denkName: nameOfDeck }, function (err, res) {
        if (res.length > 0) {
            //console.log('callback result ' + res);
            cb(res);
        }
    });
}

var getDecksCardsFromDB = module.exports.getDecksCardsFromDB = function (cardID, cb) {
    db.cards.find({ "_id": ObjectId(cardID) }, function (err, card) {
        if (err) {
            //console.log("nopezzzz");
        } else {
            cb(card)
        }
    });
}

var getDeckRace = exports.getDeckRace = function (raceId, cb) {
    //console.log('id = ' + raceId);
    db.races.find({ "_id": ObjectId(raceId) }, function (err, race) {
        if (err) {
            //console.log("nopezzzz");
        } else {
            cb(race)
        }
    });
}

var getDeckElements = module.exports.getDeckElements = function (elements, cb) {
    var array = [];
    async.forEach(elements, function (element, callback) {

        db.elements.find({ "_id": ObjectId(element) }, function (err, element) {
            if (err) {

            } else {
                //console.log('in element finder enzo ' + element[0].element);
                array.push(element[0]);
                callback()
            }
        });

    }, function () {
        cb(array)
    });
}

module.exports.loadDataInDecks = function (deck, cb) {
    var deckArray = [];

    getDeckRace(deck.race, function (raceRes) {
        deck.race = raceRes[0].race;
        getDeckElements(deck.elements, function (elementsRes) {
            deck.elements = elementsRes;

            async.forEach(deck.cards, function (card, callback) {
                getDecksCardsFromDB(card, function (card) {
                    deckArray.push(card[0]);
                    callback();
                });

            }, function () {
                deck.cards = deckArray;
                //console.log(deck);
                //socket.emit('deckReturn', deck);
                cb(deck);
            });
        });
    });
}

module.exports.loadDataInNewDeck = function (deck, cb) {
    var deckArray = [];

    getDeckRace(deck.race, function (raceRes) {
        deck.race = raceRes[0].race;
        getDeckElements(deck.elements, function (elementsRes) {
            deck.elements = elementsRes;

            async.forEach(deck.cards, function (card, callback) {
                getDecksCardsFromDB(card, function (card) {
                    deckArray.push(card[0]);
                    callback();
                });

            }, function () {
                deck.cards = deckArray;
                console.log(deck);
                //socket.emit('deckReturn', deck);
                cb(deck);
            });
        });
    });
}