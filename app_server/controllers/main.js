var path = require('path');

module.exports.index = function(err, res) {
    console.log('hij is in get index');
    res.sendFile(path.resolve('app_server/views/index.html'));
};

module.exports.home = function(err, res) {
    console.log('hij is in get home');
    res.sendFile(path.resolve('app_server/views/partials/home.html'));
};

module.exports.deckBuilder = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/createdeck.html'));
};

module.exports.cardBrowser = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/cardBrowser.html'));
};

module.exports.card = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/card.html'));
};

module.exports.theGameInfo = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/theGameInfo.html'));
};

module.exports.playMenu = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/playMenu.html'));
};

module.exports.gameWindow = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/gameWindow.html'));
};

module.exports.selectRace = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectRace.html'));
};

module.exports.selectElement = function(err, res) {
    res.sendFile(path.resolve('app_server/views/partials/selectElement.html'));
};



// app.get('/deckBuilder', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/createdeck.html');
//     currentPage = '/#deckBuilder';
// });

// app.get('/cardBrowser', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/cardBrowser.html');
//     currentPage = '/#cardBrowser';
// });

// app.get('/card', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/card.html');
//     currentPage = '/#card';
// });

// app.get('/theGameInfo', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/theGameInfo.html');
//     currentPage = '/#theGameInfo';
// });

// app.get('/playMenu', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/playMenu.html');
//     currentPage = '/#playMenu';
// });

// app.get('/gameWindow', function (req, res) {
//     res.sendFile(__dirname + '/views/gameWindow.html');
//     currentPage = '/#gameWindow';
// });

// app.get('/selectRace', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/selectRace.html');
//     currentPage = '/#selectRace';
// });

// app.get('/selectElement', function (req, res) {
//     res.sendFile(__dirname + '/views/partials/selectElement.html');
//     currentPage = '/#selectElement';
// });