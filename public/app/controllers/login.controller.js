(function() {

    'use strict';

    angular 
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['loginService'];

    function loginController(logService) {

        console.log('login contrl loaded');

        var vm = this;

        // vm.signUp = function() {
        //     console.log('hallo signUp');
        // }

        // vm.signOut = function() {
        //     console.log('hallo signOut');
        // }

        // vm.addPerson = function(name, age) {
        //     console.log('add function');
        // };

        vm.signIn = function (name, password) {
            console.log(password);
            logService.login(name, password);
        }

       

        // this.signUp = function (data) {
        //     console.log('signing Up');
        //     socket.emit('signUp', { username: data.username, password: data.password });
        // }

        // socket.on('signUp', function (data) {
        //     if (data.success) {
        //         console.log('Sign up succesfull');
        //     }
        // });

        // this.signOut = function (data) {
        //     console.log('signing Out');
        //     socket.emit('signOut');
        // }

        // socket.on('signOut', function (data) {
        //     console.log('Log out succesfull');
        //     PlayerlogIn = false;
        // });


    }

}());