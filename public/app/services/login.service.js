(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);


    loginService.$inject = ['$q', 'DBConnectionService', '$http'];

    function loginService($q, DB, $http) {

        var vm = this;
        
        //zet dit naar '' als klaar bent met testen
        vm.loggedPlayer = 'Rick';

        vm.login = function(name, password) {
            var player = {
                'name': name,
                'password': password
            }

            $http.post('/userCheck', player)
                .then(function successCallback(res) {
                    vm.loggedPlayer = res.data.value;
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.getLoggedPlayer = function() {
            return vm.loggedPlayer;
        }
    }

})();