(function(angular) {
  "use strict";

  var app = angular.module('coachClone.game.gamestats', ['ngRoute']);

  app.controller('GameStatsCtrl', ['$scope', '$location', 'PlayerList', 'RosterService', function ($scope, $location, RosterService, PlayerList) {
    $scope.players = PlayerList.players;
    updatePositionTimes();

    function updatePositionTimes(){
      var now = new Date();

      for(var i=0;i<$scope.players.length;i++){
        $scope.players[i].IncrementTimes();
        // var diff = Math.round((now - $scope.players[i].PositionStartTime) / 1000)
        //
        // switch($scope.players[i].CurrentPosition) {
        //   case 'bench':
        //     $scope.players[i].BenchTime += diff;
        //     break;
        //   case 'keeper':
        //     $scope.players[i].KeeperTime += diff;
        //     break;
        //   case 'defense':
        //     $scope.players[i].DefenseTime += diff;
        //     break;
        //   case 'midfield':
        //     $scope.players[i].MidfieldTime += diff;
        //     break;
        //   case 'forward':
        //     $scope.players[i].ForwardTime += diff;
        //     break;
        //   default: break;
        // }
      }
    }
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game/stats', {
      templateUrl: 'game/gametime/gamestats.html',
      controller: 'GameStatsCtrl',
      resolve: {
          PlayerList: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
