'use strict';

/* Services */

var services = angular.module('myApp.services', ['ngResource']);

services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/rest/data/users', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
});

// GET 1 product
services.factory('ProductFactory', function ($resource) {
    return $resource('/ngdemo/rest/data/product', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
});

//POST 1 product
services.factory('PostProductFactory', function ($resource) {
    return $resource('/ngdemo/rest/data/postProduct', {}, {
        query: {
            method: 'POST',
            params: {},
            isArray: false
        }
    })
});


//alle producten
services.factory('AllProductsFactory', function ($resource) {
    return $resource('/ngdemo/rest/data/producten', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
});
