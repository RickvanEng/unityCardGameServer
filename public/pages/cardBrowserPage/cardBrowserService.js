(function () {
    'use strict';

    angular
        .module('app')
        .service('cardBrowserService', cardBrowserService, );

    cardBrowserService.$inject = ['$q', '$http', 'DBConnectionService', 'loginService'];

    function cardBrowserService($q, $http, DBService, logService) {
        
        var vm = this;

        var allCards;
        var filter = [];

        // functions that get data from server. 
        vm.requestTypes = function () {
            var deferred = $q.defer();
            $http.get('/getTypes').then(function (data) {
                deferred.resolve(data.data.value);
            });
            return deferred.promise;
        }

        vm.requestRoles = function () {
            var deferred = $q.defer();
            $http.get('/getRoles').then(function (data) {
                deferred.resolve(data.data.value);
            });
            return deferred.promise;
        }

        vm.requestRaces = function () {
            var deferred = $q.defer();
            $http.get('/getRaces').then(function (data) {
                deferred.resolve(data.data.value);
            });
            return deferred.promise;
        }

        vm.requestElements = function () {
            var deferred = $q.defer();
            $http.get('/getElements').then(function (data) {
                deferred.resolve(data.data.value);
            });
            return deferred.promise;
        }

        vm.requestAllCards = function () {
            console.log('in request all cards')
            var deferred = $q.defer();
            $http.get('/getAllCards').then(function (data) {
                console.log(data)
                deferred.resolve(data.data.value);
            });
            return deferred.promise;
        }

        vm.requestDecks = function (user) {
            return $http.post('/getUserDecks', {name: user});
        }

        vm.saveDeck = function (deck) {
            return $http.post('/updateDeck', {'deck': deck});
        }

        vm.deleteDeck = function (ID) {
            return $http.post('/deleteDeck', {'deckID': ID});
        }
    }
}());