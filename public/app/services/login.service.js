(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);


    loginService.$inject = ['$q', 'DBConnectionService', '$http'];

    function loginService($q, DB, $http) {

        var vm = this;

        vm.loggedPlayer = DB.loggedPlayer;

        vm.login = function(name, password) {
            console.log('2');
            DB.login(name, password);
        }
    }

})();