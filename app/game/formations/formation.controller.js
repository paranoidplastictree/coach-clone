(function(angular) {
  "use strict";

  var app = angular.module('coachClone.formation', ['ngRoute', 'coachClone.formation.service', 'coachClone.roster.service']);

  app.controller('FormationCtrl', ['$scope', 'FormationService', 'RosterService', 'FormationsRecords', function ($scope, FormationService, RosterService, FormationsRecords) {
    $scope.formations = FormationService;

    $scope.setFormation = function (selectedFormation) {
      formation = selectedFormation;
      //todo: show position selector
    };

  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/formation', {
      templateUrl: 'game/formations/formation.html',
      controller: 'FormationCtrl',
      resolve: {
          FormationsRecords: ['FormationService', function (FormationService) {
              return FormationService.collect();
          }]
      }
    });
  }]);

})(angular);
