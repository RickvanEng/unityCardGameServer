var request = require('request');
var path = require('path');
var async = require('async');

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['users', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;

var userDao = require("../database/player.dao.js");

var sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.playerLogIn = function (req, res) {
    userDao.isValidPassword(req.body, function (res1) {
        if (res1) {
            console.log('player matched');
            sendResponse(res, 200, { "status": "succes", "value": req.body.name });
        } else {
            console.log('no match');
            sendResponse(res, 200, { "status": "failure", "value": "no match" });
        }
    })
};