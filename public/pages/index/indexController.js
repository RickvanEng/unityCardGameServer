(function() {

    'use strict';

    angular 
        .module('app')
        .controller('indexController', indexController);

    indexController.$inject = [];

    function indexController() {

        console.log('lolololol');

        var vm = this;

        vm.testVar = 'dit is een index controller';        

        // var signDiv = document.getElementById('signDiv');
        // var signDivUsername = document.getElementById('signDiv-username');
        // var signDivSignIn = document.getElementById('signDiv-signIn');
        // var signDivSignUp = document.getElementById('signDiv-signUp');
        // var signDivPassword = document.getElementById('signDiv-password');

        //als de player wilt inloggen. stuurt de gegevens mee van de velden
        // signDivSignIn.onclick = function () {
        //     DB.signIn({ username: signDivUsername.value, password: signDivPassword.value });
        //     document.getElementById('signDiv-username').value = '';
        //     document.getElementById('signDiv-password').value = '';
        // }

        // signDivSignUp.onclick = function () {
        //     DB.signUp({ username: signDivUsername.value, password: signDivPassword.value });
        //     document.getElementById('signDiv-username').value = '';
        //     document.getElementById('signDiv-password').value = '';
        // }

        // signDivSignOut.onclick = function () {
        //     DB.signOut();
        // }

        //chat functie
        //chat
        // var chatText = document.getElementById('chat-text');
        // var chatInput = document.getElementById('chat-input');
        // var chatForm = document.getElementById('chat-form');

        // chatForm.onsubmit = function (e) {
        //     console.log(chatInput)
        //     e.preventDefault();
        //     if (chatInput.value[0] === '/') {
        //         DB.evalServer(chatInput.value.slice(1));
        //     } else {
        //         DB.sendMessage(chatInput.value);
        //         chatInput.value = '';
        //     }
        // }


        // //word gebruikt om de chat te laten zien en te hiden
        // $scope.myFunction = function () {
        //     if (chatbox.style.display == 'none') {
        //         chatbox.style.display = 'inline-block';
        //     } else {
        //         chatbox.style.display = 'none'
        //     }
        // }


    }

}());