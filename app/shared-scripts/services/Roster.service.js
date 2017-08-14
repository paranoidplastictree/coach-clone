(function () {
    var app = angular.module('coachClone.roster.service', ['coachClone.model']);

    app.service('RosterService', ['Player', 'ServerService', '$q', function (Player, ServerService, $q) {
            var rawPlayers,
                players;

            function addPlayer(properties) {
                return $q(function (resolve, reject) {
                    rawPlayers.$add(properties).then(function (rawPlayer) {
                        player = new Player(rawPlayer);
                        players.push(player);
                    });
                });
            }

            function removePlayer(player) {
                return $q(function (resolve, reject) {
                    rawPlayers.$remove(player.fb).then(function () {
                        var index = players.indexOf(player);

                        if (index > -1) {
                            players.splice(index, 1);
                        }

                        resolve();
                    });
                });
            }

            function getById(id) {
                var i;

                for (i = 0; i < players.length; i += 1) {
                    if (players[i].id === id) {
                        return players[i];
                    }
                }

                return null;
            }

            function collect() {
                return $q(function (resolve, reject) {
                    if (players.length > 0) {
                        return resolve(players);
                    }

                    ServerService.roster.get().$promise.then(function (data){
                        rawPlayers = data.value;

                        for (index in rawPlayers) {
                            player = new Player(rawPlayers[index]);
                            players.push(player);
                        }

                        resolve(players);
                    }).catch(function (err) {
                        console.log('Error Collecting Roster: ' + err);
                        reject(err);
                    });
                });

                // return $q(function (resolve, reject) {
                //     resolve([
                //         {
                //             name: 'Bobby'
                //         },
                //         {
                //             name: 'Judy'
                //         },
                //         {
                //             name: 'Dick'
                //         },
                //         {
                //             name: 'Jane'
                //         }
                //     ])
                // });
            }

            (function () {
                players = [];
            })();

            return {
                addPlayer: addPlayer,
                removePlayer: removePlayer,
                getById: getById,
                players: players,
                rawPlayers: rawPlayers,
                collect: collect
            };
        }]);

})();
