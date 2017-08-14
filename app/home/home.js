(function(angular) {
  "use strict";

  var app = angular.module('coachClone.home', ['ngRoute', 'coachClone.formation.service', 'coachClone.roster.service']);

  app.controller('HomeCtrl', ['$scope', 'FormationService', 'RosterService', 'FormationsRecords', 'PlayerRecords', function ($scope, FormationService, RosterService, FormationsRecords, PlayerRecords) {

    $scope.players = PlayerRecords;
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
          FormationsRecords: ['FormationService', function (FormationService) {
              return FormationService.collect();
          }],
          PlayerRecords: ['RosterService', function (RosterService) {
              return RosterService.collect();
          }]
      }
    });
  }]);

})(angular);
