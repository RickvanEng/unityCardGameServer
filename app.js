var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['players', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

var async = require('async');

var express = require('express');
var app = express();
var serv = require('http').createServer(app);
var path = require('path')
var io = require('socket.io')(serv, {});

var playerDao = require("./app_server/database/player.dao.js");
var router = require('./app_server/routes/rest.router');
var playerObject = require('./app_server/objects/player.object');

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use('/', router);

serv.listen(2000);
console.log("server started");

var DEBUG = true;


//SOCKETS, this needs a new file
io.sockets.on('connection', function (socket) {

    console.log('socket ' + socket.id + ' connected');

    var player = playerObject.newPlayerObject();
    player.socket = socket;
    player.playerID = Math.random();

    socket.on("USER_CONNECT", function () {
        console.log('user: ' + socket.id + ', connected');
        player.playerOnconnect(player);
    });

    socket.on('enterQue', function (deck) {
        playerObject.addPlayerToQue();

        //get object, add object to que, en match met andere player
        playerObject.matchPlayers(player, function (res, err) {
            if (res) {
                res.player1.socket.emit('test', { 'name': res.player2.deck.deckName });
                res.player2.socket.emit('test', { 'name': res.player1.deck.deckName });
            } else {
                console.log('error: ' + err);
            }
        });
    });


    // Tijdens testen is user "Rick" standaard ingelogd

    // socket.on('signIn', function (data) {
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
        Player.onDisconnect(socket);
        SOCKET_LIST.splice(socket.id);
        socket.emit('signOut');
    });

    //Chat functies
    socket.on('f', function (data) {
        var name = ("" + playerName);
        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', { 'playerName': name, 'message': data.message });
        }
    });

    //Debug functie
    //Evaluate function, can be used to check values of some vars
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

//emit naar alle sockets die er zijn
//io.sockets.emit('test', {'name': 'bla'});

//Emit naar een specifieke socket
//Player.list[i].socket.emit('test', {'name': 'bla'});


// for (var i in Player.list) {
//     Player.list[i].socket.emit('test', {'name': 'bla'});
// }

// function sendData() {
//     io.broadcast.to('room1').emit('test', { 'name': 'test' });
// }