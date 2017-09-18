var path = require('path');

module.exports.index = function (err, res) {
    res.sendFile(path.resolve('app_server/views/index.html'));
};

module.exports.home = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/home.html'));
};

module.exports.deckBuilder = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/createdeck.html'));
};

module.exports.cardBrowser = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/cardBrowser.html'));
};

module.exports.card = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/card.html'));
};

module.exports.theGameInfo = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/theGameInfo.html'));
};

module.exports.playMenu = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/playMenu.html'));
};

module.exports.gameWindow = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/gameWindow.html'));
};

module.exports.selectRace = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectRace.html'));
};

module.exports.selectElement = function (err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectElement.html'));
};