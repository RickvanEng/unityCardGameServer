var async = require('async');

module.exports.matchPlayerForBattle = function (playersInQue, player, cb) {
    console.log('searching for opponent')



    if (playersInQue.length > 1) {

        console.log(playersInQue.length)
        console.log('socket van ' + playersInQue[0].deck.deckName + ' id is = '  + playersInQue[0].socket.id)
        console.log('socket van ' + playersInQue[1].deck.deckName + ' id is = '  + playersInQue[1].socket.id)

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

        // console.log('player1 = ' + players.player1.deck.deckName + ', player1 = ' + players.player2.deck.deckName)

    }
};