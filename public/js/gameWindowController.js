var app = angular.module('myApp.gameWindowController', ['DBService', 'ngCookies']);

app.controller('gameWindowController', ['$scope', 'DB', '$window', '$compile', '$cookies',
    function ($scope, DB, $window, $compile, $cookies) {
        console.log('gameWindow controller');

        if (DB.getPlayerlogIn()) {
            console.log('yes hij i nog logged!!!');
        } else {
            console.log('not logged in');
        }

        document.getElementById('INDEXHEADER').style.display = 'none';

    }
]);