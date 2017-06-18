var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['players', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

// var router = express.Router();

var async = require('async');

var express = require('express');
var app = express();
var serv = require('http').createServer(app);
var path = require('path')

app.use(express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
var index = require('./app_server/routes/index');
// routes naar alle pages
app.use('/', index);


serv.listen(2000);
console.log("server started");

var currentPage = '';
var deckBuildrdy = false;

var SOCKET_LIST = [];
var SOCKET_LIST2 = [];
var DEBUG = true;
var CARD_LIST = [];


var dao = require("./app_server/modules/dao.js");

var Player = function (id, socketId) {
    var playerId = id;
    var socketId = socketId;
}

Player.list = {};

Player.onConnect = function (socket, data) {
    var player = Player(data.username);
    var socketId = Player(socket.id);
}

Player.onDisconnect = function (socket) {
    //console.log(Player.list[socket.id]);
    delete Player.list[socket.id];
}



//function die als server voor eerst laad alle kaarten ophaald van de db.
var init = function (cb) {

    dao.getAllCards(function (res) {
        CARD_LIST = res;

        async.forEach(CARD_LIST, function (card, callback) {
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
            //console.log('cards are loaded from db');
        });

    });
}

init();


//SOCKETS
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {



    socket.id = Math.random();

    var playerName;

    socket.on('loginCheck', function (data) {
        //console.log(playerName);
        if (loggedIn) {
            socket.emit('loginCheckReturn', true)
        }
    });

    //Inloggen
    socket.on('signIn', function (data) {
        console.log(data.password);
        //hij kijkt of de naam en pass matchen in DB.
        dao.isValidPassword(data, function (res) {
            if (res) {
                Player.onConnect(socket, data.username);
                //als de array nog leeg zet hem erin
                if (SOCKET_LIST2.length === 0) {
                    SOCKET_LIST2.push({ 'socketID': socket.id, 'playerName': data.username });
                    playerName = data.username;
                    socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });
                    SOCKET_LIST.push(socket);
                    console.log('this player socket id = ' + socket.id);
                } else {
                    var x;
                    //als de array al gevuld kijk of de persoon niet dubbel inlogd. zo niet, plaats hem er ook in.
                    async.forEach(SOCKET_LIST2, function (user, callback) {
                        if (user.playerName === data.username) {
                            x = true;
                            callback();
                        } else {
                            x = false;
                            callback();
                        }
                    }, function () {
                        if (x) {
                            console.log('player already on list');
                            playerName = data.username;
                            socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });

                        } else {
                            console.log('player not on list, log in');
                            socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });
                            playerName = data.username;
                            SOCKET_LIST.push(socket);
                            console.log('this player socket id = ' + socket.id);
                        }
                    });
                }

            } else {
                socket.emit('signInResponse', { success: false });
            }
        });
    });

    //aanmelden
    socket.on('signUp', function (data) {
        dao.isUsernameTaken(data, function (res) {
            if (res) {
                socket.emit('signUpResponse', { success: false });
            } else {
                dao.saveNewUser(data.username, data.password, function () {
                    socket.emit('signUpResponse', { success: true });
                });
            }
        });
    });

    //uitloggen
    socket.on('signOut', function () {
        //console.log('player disconnected');
        //console.log('SOCKET_LIST = ' + SOCKET_LIST.length);
        Player.onDisconnect(socket);
        SOCKET_LIST.splice(socket.id);
        //console.log('SOCKET_LIST = ' + SOCKET_LIST.length);
        socket.emit('signOut');
    });


    //Chat functies
    socket.on('addToChat', function (data) {
        console.log('sending message from player : ' + playerName);
        var name = ("" + playerName);
        //console.log(SOCKET_LIST[0]);
        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', { 'playerName': name, 'message': data.message });
        }
    });


    //Saves the deck. Checks if name already exists, if not, it makes a new deck.
    socket.on('saveDeck', function (data) {
        var cardList = [];
        for (var i = 0; i < data.deckList.length; i++) {
            cardList.push(data.deckList[i]._id);
        }

        db.decks.find({ "_id": ObjectId(data.deckId) }, function (err, res) {
            if (res) {
                //console.log(res);
                db.decks.update({ "_id": ObjectId(data.deckId) }, { $set: { deckName: data.deckName } }, { multi: true }, function (err, res) {
                    db.decks.update({ "_id": ObjectId(data.deckId) }, { $set: { cards: cardList } }, { multi: true }, function (err, res) {
                        db.decks.find({ "_id": ObjectId(data.deckId) }, function (err, res) {
                            var array = [];
                            async.forEach(res[0].cards, function (item, callback) {
                                dao.getDecksCardsFromDB(item, function (card) {
                                    //console.log(card);
                                    array.push(card[0]);
                                    callback();
                                });
                                //Stuur het hele object terug naar de controller.
                            }, function () {
                                res[0].cards = array;
                                socket.emit('saveDeckReturn', res[0]);
                            });
                        });
                    });
                });
            }
        });
    });

    //Check is deck exists. If it exists it updates the deck values with the new info.
    socket.on('updateDeck', function (data) {
        var name = ("" + playerName);
        dao.isDeckNameTaken(data.deckName, name, function (res) {
            if (res) {
                var cardList = [];
                for (var i = 0; i < data.deckList.length; i++) {
                    cardList.push(data.deckList[i]._id);
                }

                db.decks.find({ deckName: data.deckName, deckOwner: name }, function (err, res) {
                    dao.deleteDeckFromDB(data.deckName, name, function (res) {
                        db.decks.update({ deckName: data.deckName, deckOwner: name }, { $set: { cards: cardList } }, { multi: true });
                    });
                });
                socket.emit('updateDeckReturn');

            }
        });
    });



    //This method loads all decks from the DB, then loads each card Object instead of the reference in each Deck and adds them to the Deck. 
    //then it sends back the result of each deck to the angularJS controller.
    socket.on('getPlayerDecks', function () {
        console.log('in get player decks');
        console.log(playerName);
        console.log(socket.id);
        var name = playerName;
        var resArray = [];

        dao.getDecksFromDB(name, function (decks) {

            if (decks) {
                async.forEach(decks, function (item, callback) {
                    dao.loadDataInDecks(item, function (res) {
                        resArray.push(res);
                        callback();
                    });
                }, function () {
                    console.log(resArray);
                    socket.emit('deckReturn', resArray);
                });
            }
        });
    });

    //Evaluate function, can be used to check values of some vars and stuff
    socket.on('evalServer', function (data) {
        if (!DEBUG)
            return;
        var res = eval(data);
        socket.emit('evalAnswer', res);
    });

    socket.on('requestCardList', function () {
        db.cards.find({}, function (err, data) {
            if (data.length > 0)
                socket.emit('cardList', data)
        });
    });

    socket.on('loadDBCards', function () {
        socket.emit('loadDBCards-return', CARD_LIST)
    });

    socket.on('getContent', function (info) {
        console.log(info);
        info = info.toLowerCase();
        db.content.find({ "docName": info }, function (err, res) {
            if (res) {
                socket.emit('getContent', res)
            }
        });
    });

    socket.on('getRaces', function () {
        db.races.find({}, function (err, res) {
            if (res) {
                socket.emit('getRacesReturn', res)
            }
        });
    });

    socket.on('getElements', function () {
        //console.log('getRaces request binnen');
        db.elements.find({}, function (err, res) {
            if (res) {
                //console.log(res);
                socket.emit('getElementsReturn', res)
            }
        });
    });

    socket.on('getTypes', function () {
        //console.log('getTypes request binnen');
        db.types.find({}, function (err, res) {
            if (res) {
                //console.log(res);
                socket.emit('getTypesReturn', res)
            }
        });
    });

    socket.on('getRoles', function () {
        //console.log('getRoles request binnen');
        db.roles.find({}, function (err, res) {
            if (res) {
                //console.log(res);
                socket.emit('getRolesReturn', res)
            }
        });
    });

    socket.on('getHomeContent', function () {
        //console.log('getHomeContent request binnen');
        db.content.find({ docName: "home-content" }, function (err, res) {
            if (res) {
                //console.log(res);
                socket.emit('getHomeContentReturn', res)
            }
        });
    });

    socket.on('deleteDeck', function (data) {
        //console.log(data);
        db.decks.remove({ deckName: data }, function (err, res) {
            if (res) {
                //console.log(res);
            }
        });
    });

    socket.on('getLores', function () {
        //console.log('in getLores');
        db.content.find({ docName: 'raceLores' }, function (err, res) {
            if (res) {
                //console.log(res);
                socket.emit('getLoresReturn', res)
            }
        });
    });

    // Dit gaat niet goed werken met meerdere gebruikers.
    var deckBuildId;

    socket.on('DeckBuilder-step1', function (race) {
        console.log('in DeckBuilder-step1');

        db.decks.find({ "deckOwner": playerName, "deckName": "tempDeck" }, function (err, res) {
            if (res.length > 0) {
                //console.log(res);
            } else {
                //console.log(res);
                db.decks.insert({
                    "deckOwner": playerName,
                    "deckName": "",
                    "race": race._id,
                    "elements": [],
                    "cards": []
                },
                    function (err, res) {
                        if (res) {
                            deckBuildId = res._id;
                            console.log(res)
                        } else {
                            console.log(err)
                        }
                    });
            }
        });

    });

    socket.on('DeckBuilder-step2', function (elementArray) {
        var idArray = [];

        async.forEach(elementArray, function (element, callback) {
            db.elements.find({ 'element': element }, function (err, res) {
                if (res) {
                    idArray.push(res[0]._id);
                    callback();
                }
            })
            //Stuur het hele object terug naar de controller.
        }, function () {
            db.decks.update({ "_id": deckBuildId }, { $set: { elements: idArray } }, { multi: true });
            deckBuildrdy = true;
        });
    });

    socket.on('deckBuildCheck', function (elementArray) {
        if (deckBuildrdy === true) {
            db.decks.find({ "_id": deckBuildId }, function (err, res) {
                //console.log(res[0]);

                dao.loadDataInDecks(res[0], function (deck) {
                    //console.log('return deck 3');
                    socket.emit('deckBuildCheckReturn', { bool: true, deck: deck });
                });
                deckBuildrdy = false;
            });

        }
    });
});