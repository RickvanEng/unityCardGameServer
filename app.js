var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['players', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;



// var router = express.Router();

var async = require('async');

var express = require('express');
var app = express();
var serv = require('http').createServer(app);
var path = require('path')
var dao = require("./app_server/modules/dao.js");

var io = require('socket.io')(serv, {});

app.use(express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
var index = require('./app_server/routes/index');
var MatchPlayerClass = require('./app_server/controllers/playermatchingController');
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

var playersInQue = [];



var Player = function (id, socketId) {
    var playerId = id;
    var socketId = socketId;
}

Player.list = [];



Player.onConnect = function (id, socket, callback) {
    var obj = {
        'playerName': 'tempName',
        'deck': null,
        'socket': socket,
        'id': id
    };

    //add ze aan algemene playerList en dat ze opzoek zijn naar opponent
    Player.list.push(obj);

    callback();
}

Player.onDisconnect = function (socket) {
    //console.log(Player.list[socket.id]);
    delete Player.list[socket.id];
    console.log('deleted')
}

//gets player object out of Player.list
function getPlayerObject(id, cb) {
    for (var i in Player.list) {
        if (Player.list[i].id === id) {
            cb(Player.list[i]);
        }
    }
}

//add the player object to the que array
function addPlayerToQue(player, cb) {
    console.log('add player to que')
    playersInQue.push(player);
    cb();
}



//SOCKETS


function sendData() {
    console.log('in send data');
    io.broadcast.to('room1').emit('test', { 'name': 'bla' });
    //io.emit('room1').emit('test', { 'name': 'bla' });
}

io.sockets.on('connection', function (socket) {

    console.log('socket ' + socket.id + ' connected');

    var id = Math.random();

    // var player = {
    //     'id': id,
    //     'socket': socket,
    //     'name': null,
    //     'deck': null,
    //     'room': null
    // };

    var opponent;

    Player.onConnect(id, socket, function (err, res) {
        console.log('player object added succesfully')
    });

    //adds player to the que
    socket.on('enterQue', function (deck) {
        getPlayerObject(id, function (player) {
            player.deck = deck;
        });

        //get object, add object to que, en match met andere player
        getPlayerObject(id, function (player) {
            addPlayerToQue(player, function () {
                MatchPlayerClass.matchPlayerForBattle(playersInQue, player, function (res, err) {

                    if (res) {

                        res.player1.socket.emit('test', { 'name': res.player2.deck.deckName });
                        res.player2.socket.emit('test', { 'name': res.player1.deck.deckName });

                        //removeFromQue(res.player1, res.player2);

                        //remove players uit de Matchlist so they cant get matched again.

                        // for (var x in playersInQue) {
                        //     if (playersInQue[x].socket === res.player1.socket) {
                        //         playersInQue.splice(x, 1);
                        //         //console.log('player spliced');
                        //     }

                        //     if (playersInQue[x].socket === res.player2.socket) {
                        //         playersInQue.splice(x, 1);
                        //         //console.log('player spliced');
                        //     }
                        // }
                    } else {
                        console.log('error: '  + err);
                    }

                    //emit naar alle sockets die er zijn
                    //io.sockets.emit('test', {'name': 'bla'});

                    //Emit naar een specifieke socket
                    //Player.list[i].socket.emit('test', {'name': 'bla'});
                    //Player.list[i].socket.emit('test', {'name': 'bla'});


                    // for (var i in Player.list) {
                    //     Player.list[i].socket.emit('test', {'name': 'bla'});
                    // }
                });
            });
        });



        //roep hier method aan in andere class, stuur player in que mee.
        //returned matched players
        //moeten uit playerinQue qorden gehaald
        //pushed als matched pair in nieuwe array

    });

    // Player.onConnect(socket, data.username);



    // socket.on('loginCheck', function (data) {
    //     //console.log(playerName);
    //     if (loggedIn) {
    //         socket.emit('loginCheckReturn', true)
    //     }
    // });

    //Inloggen
    // socket.on('signIn', function (data) {
    //     console.log(data.password);
    //     //hij kijkt of de naam en pass matchen in DB.
    //     dao.isValidPassword(data, function (res) {
    //         if (res) {
    //             Player.onConnect(socket, data.username);
    //             //als de array nog leeg zet hem erin
    //             if (SOCKET_LIST2.length === 0) {
    //                 SOCKET_LIST2.push({ 'socketID': socket.id, 'playerName': data.username });
    //                 playerName = data.username;
    //                 socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });
    //                 SOCKET_LIST.push(socket);
    //                 console.log('this player socket id = ' + socket.id);
    //             } else {
    //                 var x;
    //                 //als de array al gevuld kijk of de persoon niet dubbel inlogd. zo niet, plaats hem er ook in.
    //                 async.forEach(SOCKET_LIST2, function (user, callback) {
    //                     if (user.playerName === data.username) {
    //                         x = true;
    //                         callback();
    //                     } else {
    //                         x = false;
    //                         callback();
    //                     }
    //                 }, function () {
    //                     if (x) {
    //                         console.log('player already on list');
    //                         playerName = data.username;
    //                         socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });

    //                     } else {
    //                         console.log('player not on list, log in');
    //                         socket.emit('signIn', { success: true, playerId: data.username, page: currentPage, name: data.username, password: data.password, socketID: socket.id });
    //                         playerName = data.username;
    //                         SOCKET_LIST.push(socket);
    //                         console.log('this player socket id = ' + socket.id);
    //                     }
    //                 });
    //             }

    //         } else {
    //             socket.emit('signInResponse', { success: false });
    //         }
    //     });
    // });

    //aanmelden
    // socket.on('signUp', function (data) {
    //     dao.isUsernameTaken(data, function (res) {
    //         if (res) {
    //             socket.emit('signUpResponse', { success: false });
    //         } else {
    //             dao.saveNewUser(data.username, data.password, function () {
    //                 socket.emit('signUpResponse', { success: true });
    //             });
    //         }
    //     });
    // });

    //uitloggen
    // socket.on('signOut', function () {
    //     //console.log('player disconnected');
    //     //console.log('SOCKET_LIST = ' + SOCKET_LIST.length);
    //     Player.onDisconnect(socket);
    //     SOCKET_LIST.splice(socket.id);
    //     //console.log('SOCKET_LIST = ' + SOCKET_LIST.length);
    //     socket.emit('signOut');
    // });

    //Chat functies
    socket.on('f', function (data) {
        console.log('sending message from player : ' + playerName);
        var name = ("" + playerName);
        //console.log(SOCKET_LIST[0]);
        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', { 'playerName': name, 'message': data.message });
        }
    });

    //Evaluate function, can be used to check values of some vars and stuff
    socket.on('evalServer', function (data) {
        if (!DEBUG)
            return;
        var res = eval(data);
        socket.emit('evalAnswer', res);
    });

    //werkt nog niet
    socket.on('onDisconnect', function () {
        console.log('dis')
        Player.onDisconnect(socket);
    })


});