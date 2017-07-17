var async = require('async');

module.exports.matchPlayerForBattle = function (playersInQue, player, cb) {
    console.log('searching for opponent')

    if (playersInQue.length > 1) {

        var players = {
            'player1': player,
            'player2': null
        }

        async.forEach(playersInQue, function (opponent, callback) {
            if (opponent.socket != player.socket) {
                players.player2 = opponent;
            }
            callback();
        }, function () {
            cb(players);
        });
    }
};