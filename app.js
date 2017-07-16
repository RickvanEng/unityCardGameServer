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

var dao = require("./app_server/modules/dao.js");

var Player = function (id, socketId) {
    var playerId = id;
    var socketId = socketId;
}

Player.list = [];



Player.onConnect = function (data, callback) {
    var obj = {
        'player': data.name,
        'deck': data.deck,
        'socket': data.socket
    };

    Player.list.push(obj);
    playersInQue.push(obj);

    callback();
}

Player.onDisconnect = function (socket) {
    //console.log(Player.list[socket.id]);
    delete Player.list[socket.id];
}



//SOCKETS
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {

    var player;
    var opponent;

    console.log('socket connect');
    console.log(socket.id)
    //socket.id = Math.random();

    //SOCKET_LIST.push(socket);

    //adds player to the que
    socket.on('enterQue', function (deck) {
        Player.onConnect({ 'socket': socket, 'name': 'Rick', 'deck': deck }, function (err, res) {
            player = {
                'socket': socket,
                'name': 'Rick',
                'deck': deck
            };

            //roep hier method aan in andere class, stuur player in que mee.
            //returned matched players
            //moeten uit playerinQue qorden gehaald
            //pushed als matched pair in nieuwe array
            MatchPlayerClass.matchPlayerForBattle(playersInQue, player, function (res1, err) {

                var opponent = res1.player2;

                for (var x in playersInQue) {
                    if (playersInQue[x].socket === res1.player1.socket) {
                        playersInQue.splice(x, 1);
                        console.log('player spliced');
                    }

                    if (playersInQue[x].socket === res1.player2.socket) {
                        playersInQue.splice(x, 1);
                        console.log('player spliced');
                    }
                }

                console.log('socket van player (' + player.deck.deckName + ') = ' + player.socket.id)
                console.log('socket van opponent (' + opponent.deck.deckName + ') = ' + opponent.socket.id)

                socket.emit('test', { 'name': opponent.deck.deckName });
                opponent.socket.to('test', {'name': player.deck.deckName});



            })
        });

        // for (var i in Player.list) {
        //     if (socket === Player.list[i].socket) {
        //         console.log('match');
        //     }
        // }
        //console.log('deck recieved')
    });

    var playerName;

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
});