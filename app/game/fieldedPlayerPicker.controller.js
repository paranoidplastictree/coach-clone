(function(angular) {
  "use strict";

  var app = angular.module('coachClone.fieldedPlayerPicker', ['ngRoute']);

  app.controller('FieldedPlayerPickerCtrl', ['$scope', '$routeParams', '$location', 'PlayerList', 'RosterService', function ($scope, $routeParams, $location, RosterService, PlayerList) {
    $scope.players = PlayerList.players;
    updatePositionTimes();

    $scope.setNextPositions = function (targetPlayerId){

      var targetFieldedPlayer = getPlayer(targetPlayerId);
      var incomingPlayer = getPlayer($routeParams.id);

      // set next positions of both players
      if(targetFieldedPlayer != null && incomingPlayer != null){
          targetFieldedPlayer.NextPosition = incomingPlayer.CurrentPosition;
          incomingPlayer.NextPosition = targetFieldedPlayer.CurrentPosition;
      }

      // go back to gametime view
      $location.path('/game/gametime');
    };

    $scope.fieldedPlayers = function (item) {
      var filtered = [];
      return item.CurrentPosition != 'bench' && item.CurrentPosition != null;
    };

    function updatePositionTimes(){
      var now = new Date();

      for(var i=0;i<$scope.players.length;i++){

        var diff = Math.round((now - $scope.players[i].PositionStartTime) / 1000)

        switch($scope.players[i].CurrentPosition) {
          case 'bench':
            $scope.players[i].BenchTime += diff;
            break;
          case 'keeper':
            $scope.players[i].KeeperTime += diff;
            break;
          case 'defense':
            $scope.players[i].DefenseTime += diff;
            break;
          case 'midfield':
            $scope.players[i].MidfieldTime += diff;
            break;
          case 'forward':
            $scope.players[i].ForwardTime += diff;
            break;
          default: break;
        }

        // reset position start time
        $scope.players[i].PositionStartTime = now;
      }
    }

    function getPlayer(id){
      for(var i=0;i<$scope.players.length;i++){
        if($scope.players[i].Id === id){
          return $scope.players[i];
        }
      }
    }

  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fielded-player-picker/:id', {
      templateUrl: 'game/fielded-player-picker.html',
      controller: 'FieldedPlayerPickerCtrl',
      resolve: {
          PlayerList: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
