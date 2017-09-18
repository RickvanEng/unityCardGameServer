var mongojs = require("mongojs");
var db = mongojs('localhost:27017/cardGame', ['users', 'cards', 'decks', 'content', 'races', 'types', 'elements', 'roles']);
var ObjectId = require('mongodb').ObjectID;
var async = require('async');

module.exports.isValidPassword = function (data, cb) {
    db.users.find({ username: data.username, password: data.password }, function (err, res) {
        if (res.length > 0) {
            cb(true);
        }
        else
            cb(false);
    });
}

module.exports.isUsernameTaken = function (data, cb) {
    db.account.find({ username: data.username }, function (err, res) {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

module.exports.saveNewUser = function (userName, password, cb) {
    db.collection('users').insert({
        "username": userName, "password": password
    })
};