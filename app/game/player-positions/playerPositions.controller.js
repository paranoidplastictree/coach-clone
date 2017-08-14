(function(angular) {
  "use strict";

  var app = angular.module('coachClone.playerPositions', ['ngRoute']);

  app.controller('PlayerPositionsCtrl', ['$scope', 'PlayerList', 'RosterService', function ($scope, RosterService, PlayerList) {

    $scope.positions = null;
    $scope.players = PlayerList.players;

    $scope.save = function (){
      //todo: save positions
      //todo: display game mode
    };

    $scope.showBenchChooser = function(){
      //todo: show players, ordered by benched status
    };

    $scope.getPlayers = function(){
      //todo: call get players
    };

  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/player-positions', {
      templateUrl: 'game/player-positions/player-positions.html',
      controller: 'PlayerPositionsCtrl',
      resolve: {
          PlayerList: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
