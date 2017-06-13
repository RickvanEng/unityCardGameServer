var app = angular.module('myApp.theGameController', ['DBService']);

app.controller('theGameController', ['$scope', 'DB',
    function ($scope, DB) {
        $scope.title;
        $scope.content;

        $scope.buttonClick = function (info) {
            DB.getContent(info).then(function (data) {
                $scope.title = data[0].title;
                $scope.content = data[0].content;
            });
        };

        // socket.on('getContentReturn', function(data) {
        //      $scope.title = data[0].docName;
        //      $scope.content = data[0].content;
        //      $scope.$apply();
        // });

        // socket.emit('getPlayerDecks');

        // socket.on('deck1', function(data) {

        //});

    }
]);