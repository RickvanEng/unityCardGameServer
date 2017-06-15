(function () {
    'use strict';

    angular
        .module('app')
        .service('cardBrowserService', cardBrowserService);

    cardBrowserService.$inject = ['$q', 'DBConnectionService'];

    function cardBrowserService($q, DBService) {

        console.log('cardbrowser service loaded');

        var vm = this;

        var allCards;
        var filter = [];
        vm.loggedPlayer = 'Rick';


        // functions that get data from server. 

        vm.getLoggedPlayer = function () {
            if (vm.loggedPlayer === '') {
                return false;
            } else {
                return true;
            }
        }

        vm.requestTypes = function () {
            var deferred = $q.defer();
            DBService.requestTypes().then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

         vm.requestRoles = function () {
            var deferred = $q.defer();
            DBService.requestRoles().then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        vm.requestRaces = function () {
            var deferred = $q.defer();
            DBService.requestRaces().then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

         vm.requestElements = function () {
            var deferred = $q.defer();
            DBService.requestElements().then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        vm.requestCards = function () {
            var deferred = $q.defer();
            DBService.requestCards().then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        vm.setFilter = function(para1, para2) {
            filter[0] = para1;
            filter[1] = para2;
            console.log('nieuwe filter = ' + filter[0] + ' ' + filter[1]);
        }

        vm.getFilter = function() {
            return filter;
        }

        

        // this.requestRoles = function () {
        //     var deferred = $q.defer();
        //     socket.emit('getRoles');
        //     socket.on('getRolesReturn', function (data) {
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

        // this.requestElements = function () {
        //     var deferred = $q.defer();
        //     socket.emit('getElements');
        //     socket.on('getElementsReturn', function (data) {
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

        // this.requestRaces = function () {
        //     var deferred = $q.defer();
        //     socket.emit('getRaces');
        //     socket.on('getRacesReturn', function (data) {
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

        // //TODO: if player is logged in, request decks.
        // this.requestDecks = function () {
        //     console.log('get Decks van player');
        //     var deferred = $q.defer();
        //     socket.emit('getPlayerDecks');
        //     socket.on('deckReturn', function (data) {
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

        // this.requestCards = function () {
        //     var deferred = $q.defer();
        //     socket.emit('loadDBCards');
        //     socket.on('loadDBCards-return', function (data) {
        //         types = data;
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

        

    }
}());

// this.requestLores = function () {
        //     var deferred = $q.defer();
        //     socket.emit('getLores');
        //     socket.on('getLoresReturn', function (data) {
        //         types = data;
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }

// this.getContent = function (info) {
        //     var deferred = $q.defer();
        //     socket.emit('getContent', info);
        //     socket.on('getContent', function (data) {
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // }


// function init() {
//             cardBrowserService.requestTypes().then(function (data) {
//                 vm.types = data;
//             });

//             cardBrowserService.requestRaces().then(function (data) {
//                 vm.races = data;
//             });

//             cardBrowserService.requestCards().then(function (data) {
//                 vm.cards = data;
//             });

//             cardBrowserService.requestRoles().then(function (data) {
//                 vm.roles = data;
//             });

//             cardBrowserService.requestElements().then(function (data) {
//                 vm.elements = data;
//             });
//         };