var Player = {
    playerId: null,
    socket: null,
    playerName: null,
    deck: null,
}

module.exports.newPlayerObject = function () {
    return Player;
};

var allPlayers = [];
var playersInQue = [];

var matchedPlayers = [];
var matchedPlayersObject = {
    gameId: null,
    player1: null,
    player2: null
}

module.exports.playerOnconnect = function (playerOject) {
    allPlayers.push(playerOject);
}

module.exports.playerDisconnect = function (playerOject) {
    delete allPlayers[playerOject];
}

//add the player object to the que array
module.exports.addPlayerToQue = function (playerObject) {
    playersInQue.push(playerObject);
}

module.exports.matchPlayers = function (player, cb) {
    if (playersInQue.length > 1) {

        var players = {
            player1: player,
            player2: null
        }

        async.forEach(playersInQue, function (opponent, callback) {
            if (opponent.socket != player.socket) {
                players.player2 = opponent;
            }
            callback();

        }, function () {
            //add players to matched player object
            matchedPlayersObject.gameId = Math.random();
            matchedPlayersObject.player1 = players.player1;
            matchedPlayersObject.player2 = players.player2;

            //remove player from que list
            delete playerInQue[players.player1];
            delete playerInQue[players.player2];

            //return de matched players
            cb(players);
        });
    }
};