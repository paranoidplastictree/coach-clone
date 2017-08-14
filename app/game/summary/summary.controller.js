(function(angular) {
  "use strict";

  var app = angular.module('coachClone.summary', ['ngRoute']);

  app.controller('SummaryCtrl', ['$scope', 'PlayerRecords', '$location', function ($scope, PlayerRecords, $location) {
    var i;

    $scope.swaps = [];

    for (i = 0; i < PlayerRecords.length; i += 1) {
        if (PlayerRecords[i].NextPosition !== null) {
            $scope.swaps.push(PlayerRecords[i]);
        }
    }

    $scope.substitute = function () {
        var i, attr, swaps = $scope.swaps, swap, difference, now = new Date();

        for (i = 0; i < swaps.length; i += 1) {
            swap = swaps[i];

            swap.IncrementTimes();

            swap.CurrentPosition = swap.NextPosition;
            swap.NextPosition = null;
            swap.PositionStartTime = now;
            swap.NeedsSub = false;
        }

        $location.path('/game/gametime');
    };

    $scope.cancel = function () {
        $location.path('/game/gametime');
    }

  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game/summary', {
      templateUrl: 'game/summary/summary.html',
      controller: 'SummaryCtrl',
      resolve: {
          PlayerRecords: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
