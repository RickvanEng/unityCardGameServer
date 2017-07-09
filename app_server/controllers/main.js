var request = require('request');
var path = require('path');
var dao = require("../modules/dao.js");
var async = require('async');

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['users', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

var allCards = loadAllCards();

module.exports.index = function (err, res) {
    res.sendFile(path.resolve('app_server/views/index.html'));
};

module.exports.userCheck = function (req, res) {
    dao.isValidPassword(req.body, function (res1) {
        if (res1) {
            console.log('player matched');
            sendResponse(res, 200, { "status": "succes", "value": req.body.name });
        } else {
            console.log('no match');
            sendResponse(res, 200, { "status": "succes", "value": 'boe' });
        }
    })
};

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
            //console.log(res);
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
            //console.log(res);
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

module.exports.getLores = function (req, res) {
    db.content.find({ docName: 'raceLores' }, function (err, res1) {
        if (res1) {
            //console.log(res);
            return sendResponse(res, 200, { "status": "succes", "value": res1 });
        }
    });
};

function loadAllCards(req, res) {
    dao.getAllCards(function (res1) {
        allCards = res1;

        async.forEach(allCards, function (card, callback) {
            dao.getCardRace(card.race, function (raceRes) {
                card.race = raceRes[0].race;
            });

            dao.getCardElement(card.element, function (elementRes) {
                card.element = elementRes[0].element;
            });

            dao.getCardRole(card.role, function (roleRes) {
                card.role = roleRes[0].role;
            });

            dao.getCardType(card.type, function (typeRes) {
                card.type = typeRes[0].type;
            });

            dao.getCardClassElement(card.class.type, function (classTypeRes) {
                card.class.type = classTypeRes[0].element;
            });

            callback();

        }, function () {
            console.log('cards loaded');
        });
    });
};

module.exports.getAllCards = function (req, res) {
    console.log(allCards)
    return sendResponse(res, 200, { "status": "succes", "value": allCards });
};

module.exports.updateDeck = function (req, resMain) {
    //console.log('cards van het deck dat binnenkomt: ' + JSON.stringify(req.body.deck.cards));
    // console.log(req.body.deck);
    // console.log(req.body.deck.deckName);
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
                dao.getDecksCardsFromDB(item, function (card) {
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
                return sendResponse(resMain, 400, { "status": "succes", "value": 'niet gelukt!' });
            }
        });


};

module.exports.getUserDecks = function (req, res) {
    var resArray = [];
    dao.getDecksFromDB(req.body.name, function (decks) {
        if (decks) {
            async.forEach(decks, function (item, callback) {
                dao.loadDataInDecks(item, function (res) {
                    resArray.push(res);
                    callback();
                });
            }, function () {
                sendResponse(res, 200, { "status": "succes", "value": resArray });
            });
        }
    });
};

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

module.exports.home = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/home.html'));
};

module.exports.deckBuilder = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/createdeck.html'));
};

module.exports.cardBrowser = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/cardBrowser.html'));
};

module.exports.card = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/card.html'));
};

module.exports.theGameInfo = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/theGameInfo.html'));
};

module.exports.playMenu = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/playMenu.html'));
};

module.exports.gameWindow = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/gameWindow.html'));
};

module.exports.selectRace = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectRace.html'));
};

module.exports.selectElement = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectElement.html'));
};



// app.get('/deckBuilder', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/createdeck.html');
//     currentPage = '/#deckBuilder';
// });

// app.get('/cardBrowser', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/cardBrowser.html');
//     currentPage = '/#cardBrowser';
// });

// app.get('/card', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/card.html');
//     currentPage = '/#card';
// });

// app.get('/theGameInfo', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/theGameInfo.html');
//     currentPage = '/#theGameInfo';
// });

// app.get('/playMenu', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/playMenu.html');
//     currentPage = '/#playMenu';
// });

// app.get('/gameWindow', function (req, res) {
//     res.sendFile(__dirname + '/views/gameWindow.html');
//     currentPage = '/#gameWindow';
// });

// app.get('/selectRace', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/selectRace.html');
//     currentPage = '/#selectRace';
// });

// app.get('/selectElement', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/selectElement.html');
//     currentPage = '/#selectElement';
// });