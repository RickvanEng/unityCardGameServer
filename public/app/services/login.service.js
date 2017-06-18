(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);


    loginService.$inject = ['$q', 'DBConnectionService', '$http'];

    function loginService($q, DB, $http) {

        var vm = this;
        vm.loggedPlayer;

        vm.loggedPlayer = DB.loggedPlayer;

        vm.login = function(name, password) {
            var player = {
                'name': name,
                'password': password
            }

            $http.post('/userCheck', player)
                .then(function successCallback(res) {
                    console.log('hij komt terug! '  + res.data.value);
                    vm.loggedPlayer = res.data.value;
                }, function errorCallback(error) {
                    console.log(error);
                });
        }
    }

})();