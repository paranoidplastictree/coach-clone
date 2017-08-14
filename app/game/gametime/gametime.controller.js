(function (angular) {
  "use strict";

  var app = angular.module('coachClone.game.gametime', ['ngRoute']);

  app.controller('GametimeCtrl', ['$scope', '$timeout', 'PlayerRecords', function($scope, $timeout, PlayerRecords) {
    $scope.benchedPlayers = [];
    $scope.activePlayers = [];
    $scope.totalSubs = 0;

    var positions = ['forward','forward','defense','defense','keeper'];

    var now = new Date();

    for (var i = 0; i < PlayerRecords.length; i++) {
      var player = PlayerRecords[i];

      if (player.NextPosition !== null){
        $scope.totalSubs += 1;
      }

      if (player.CurrentPosition === null) {
        if (positions.length > 0){
          player.CurrentPosition = positions.pop();
        } else {
          player.CurrentPosition = 'bench';
        }

        player.PositionStartTime = new Date(now - (Math.random() * 600000));
      }

      if (player.CurrentPosition !== 'bench') {
        $scope.activePlayers.push(player);
      } else {
        $scope.benchedPlayers.push(player);
      }
    }

    function benchCheck() {
        var i,
            benchTime,
            difference,
            now = new Date(),
            maxBenchTimeMinutes = 5,
            maxBenchTimeSeconds = (60 * maxBenchTimeMinutes);

        for (i = 0; i < PlayerRecords.length; i += 1) {
            if (PlayerRecords[i].CurrentPosition === 'bench') {
                difference = PlayerRecords[i].PositionStartTime ? Math.round((now - PlayerRecords[i].PositionStartTime) / 1000) : 0;

                benchTime = PlayerRecords[i].BenchTime + difference;

                if (benchTime > maxBenchTimeSeconds) {
                    PlayerRecords[i].NeedsSub = true;
                } else {
                    PlayerRecords[i].NeedsSub = false;
                }
            } else {
                PlayerRecords[i].NeedsSub = false;
            }
        }

        $timeout(benchCheck, 1000);
    };

    benchCheck();

    $scope.totalSubs = $scope.totalSubs == 0 ? 0 : $scope.totalSubs / 2;

    $scope.pauseResume = function() {
      var now = new Date();

      for(var i = 0; i < PlayerRecords.length; i++) {
        var player = PlayerRecords[i];

        if (player.PositionStartTime === null){
          player.PositionStartTime = now;
        } else {
          player.IncrementTimes();
          player.PositionStartTime = null;
        }
      }
    }
  }]);

  app.factory('playerList', ['PlayerRecords', function(PlayerRecords) {
    return PlayerRecords;
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/game/gametime', {
      templateUrl: 'game/gametime/gametime.html',
      controller: 'GametimeCtrl',
      resolve: {
        PlayerRecords: ['RosterService', function(RosterService){
          return RosterService.collect();
        }]
      }
    });
  }]);



})(angular);
