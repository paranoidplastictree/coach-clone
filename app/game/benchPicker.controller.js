(function(angular) {
  "use strict";

  var app = angular.module('coachClone.benchPicker', ['ngRoute']);

  app.controller('BenchPickerCtrl', ['$scope', '$routeParams', '$location', 'PlayerList', 'RosterService', function ($scope, $routeParams, $location, RosterService, PlayerList) {
    $scope.players = PlayerList.players;

    // make sure everyone's bench times are current
    updateBenchTimes();

    $scope.setNextPositions = function (benchedPlayerId){

      var benchedPlayer = getPlayer(benchedPlayerId);
      var fieldedPlayer = getPlayer($routeParams.id);

      // set next positions of both players
      if(benchedPlayer != null && fieldedPlayer != null){
        benchedPlayer.NextPosition = fieldedPlayer.CurrentPosition;
        fieldedPlayer.NextPosition = benchedPlayer.CurrentPosition;
      }

      // go back to gametime view
      $location.path('/game/gametime');
    };

    $scope.benchedPlayers = function (item) {
      return item.CurrentPosition === 'bench' || item.CurrentPosition===null;
    };

    function updateBenchTimes() {
      for(var i=0;i<$scope.players.length;i++){

        if($scope.players[i].CurrentPosition === 'bench'){

            // increment bench time
            var now = new Date();
            var diff = Math.round((now - $scope.players[i].PositionStartTime) / 1000);
            $scope.players[i].BenchTime += diff;

            // reset position start time
            $scope.players[i].PositionStartTime = now;
        }
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
    $routeProvider.when('/bench-picker/:id', {
      templateUrl: 'game/bench-picker.html',
      controller: 'BenchPickerCtrl',
      resolve: {
          PlayerList: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
