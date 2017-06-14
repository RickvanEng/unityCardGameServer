(function () {
    'use strict';

    angular
        .module('app')
        .service('DBConnectionService', DBConnectionService);


    DBConnectionService.$inject = ['$q'];

    function DBConnectionService($q) {


        //De enige socket in de file. Alles moet via deze socket worden geregeld.
        var socket = io();

        // var chat = io.connect('http://localhost/2000/chat');
        // var news = io.connect('http://localhost/2000/news');

        // chat.emit('test', {'message': 'chat emit'});
        // news.emit('test', {'message': 'news emit'});

        //hierin word de data geladen van de server dmv van functions later in deze service. getters en setters staan ook onderaan.
        var cards = [];
        var decks = [];

        this.requestTypes = function () {
            var deferred = $q.defer();
            socket.emit('getTypes');
            socket.on('getTypesReturn', function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.requestRaces = function () {            
            var deferred = $q.defer();
            socket.emit('getRaces');
            socket.on('getRacesReturn', function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.requestRoles = function () {
            var deferred = $q.defer();
            socket.emit('getRoles');
            socket.on('getRolesReturn', function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.requestElements = function () {            
            var deferred = $q.defer();
            socket.emit('getElements');
            socket.on('getElementsReturn', function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.requestCards = function () {
            var deferred = $q.defer();
            socket.emit('loadDBCards');
            socket.on('loadDBCards-return', function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        var PlayerlogIn = false;
        var deckBuildProcess = false;

        this.setDeckBuildProcess = function (bool) {
            deckBuildProcess = bool;
        };

        this.getDeckBuildProcess = function () {
            return deckBuildProcess;
        };

        //console.log('playercookie: ' + $cookies.loggedPlayer);
        //console.log('passcookie: ' + $cookies.loggedPassword);
        //socket.emit('signIn', { username: $cookies.loggedPlayer, password: $cookies.loggedPassword });

        //Voortgang van new deck maken wordt hier bijgehouden. aan eind verzonden naar server
        var newDeck = {
            'race': '',
            'elements': [],
        };

        this.saveNewDeck = function () {
            socket.emit('saveNewDeck', newDeck);
        }

        this.setNewDeck = function (data) {
            if (data.atri === 'race') {
                newDeck.race = data.value;
            } else if (data.atri === 'elements') {
                newDeck.elements = data.value;
            }
            console.log(newDeck);
        }

        this.getNewDeck = function (data) {
            return newDeck;
        }

        //Log in, Sign in en Log out functions
        this.signIn = function (data) {
            socket.emit('signIn', { username: data.username, password: data.password });
        }

        socket.on('signIn', function (data) {
            console.log('in sign in ding');
            if (data.success) {
                console.log('log in succesfull');
                PlayerlogIn = true;
                // $cookies.loggedPlayer = String(data.name);
                // $cookies.loggedPassword = String(data.password);
            }
        });

        this.signUp = function (data) {
            console.log('signing Up');
            socket.emit('signUp', { username: data.username, password: data.password });
        }

        socket.on('signUp', function (data) {
            if (data.success) {
                console.log('Sign up succesfull');
            }
        });

        this.signOut = function (data) {
            console.log('signing Out');
            socket.emit('signOut');
        }

        socket.on('signOut', function (data) {
            console.log('Log out succesfull');
            PlayerlogIn = false;
            // delete $cookies["loggedPlayer"];
            // delete $cookies["loggedPassword"];
        });


        //chat function
        this.sendMessage = function (message) {
            console.log('sending message: ' + message);
            socket.emit('addToChat', { 'message': message });
        }

        socket.on('addToChat', function (data) {
            //console.log('hij is message return');
            var chatText = document.getElementById('chat-text');
            chatText.innerHTML += '<div>' + data.playerName + ': ' + data.message + '</div>';
        });

        this.evalServer = function (message) {
            console.log('sending message');
            socket.emit('evalServer', message);
        }




        //dit request alle data van de service als de controller word geladen.
        

        //getters + setters

        this.getPlayerlogIn = function () {
            return PlayerlogIn;
        };

        this.setPlayerlogIn = function (bool) {
            PlayerlogIn = bool;
        };

        this.getCards = function () {
            return cards;
        };

        this.getRoles = function () {
            return roles;
        };

        this.getTypes = function () {
            return types;
        };

        this.getRaces = function () {
            return races;
        };

        this.getElements = function () {
            return elements;
        };

        this.getDecks = function () {
            return decks;
        };
    }

})();