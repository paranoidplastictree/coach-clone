(function(angular) {
  "use strict";

  var app = angular.module('coachClone.rollcall', ['ngRoute']);

  app.controller('RollcallCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('http://coachclone.springthroughtest.com/odata/Players')
    .success(function(data){
      $scope.players = data.value;
    })
    .error(function(){
      alert("Error while getting players.");
    });

    $scope.save = function (){
      //todo: save
      //todo: show formation selector
    };

  }]);

  app.factory('roster', ['$http', function($http){
    return [];
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game/rollcall', {
      templateUrl: 'game/rollcall/rollcall.html',
      controller: 'RollcallCtrl'
    });
  }]);

})(angular);
