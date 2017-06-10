// public/core.js
var app = angular.module('myApp.homeController', []);

app.controller('homeController', [ '$scope',
	function($scope) {
        // socket.emit('getHomeContent');

        $scope.mainTitle;
        $scope.mainContent;

        // socket.on('getHomeContentReturn', function(data) {
        //     console.log(data[0].content[0].title)
        //     $scope.mainTitle = data[0].content[0].title;
        //     $scope.mainContent = data[0].content[0].content;
        //     $scope.$apply();
        // });
	}

]);