var request = require('request');
var path = require('path');
var dao = require("../modules/dao.js");
var async = require('async');

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['users', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.playerLogin = function (req, res) {
    dao.isValidPassword(data, function (res) {
        console.log('yes hij mag inloggen');
    });
};