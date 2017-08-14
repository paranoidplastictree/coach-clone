(function (angular) {
  "use strict";

  var app = angular.module('coachClone.admin.roster', ['ngRoute']);

  app.controller('AdminRosterCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('http://coachclone.springthroughtest.com/odata/Players')
      .success(function(data){
        $scope.players = data.value;
      })
      .error(function(){
        alert('Error while getting roster');
      });
  }]);

  app.controller('AdminPlayerCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    if ($routeParams.id !== undefined){
      $http.get('http://coachclone.springthroughtest.com/odata/Players(guid\''+$routeParams.id+'\')')
        .success(function(data){
          $scope.player = data;
        })
        .error(function(){
          alert("There was an error");
        });
    } else {
      $scope.player = { 'Name': '' };
    }

    $scope.save = function() {
      if ($scope.player.Id !== undefined){
        $http.patch('http://coachclone.springthroughtest.com/odata/Players(guid\''+$scope.player.Id+'\')', $scope.player)
        .success(function(data){
          $location.path('/admin/roster');
        })
        .error(function(){
          alert('Error while saving player');
        });
      } else {
        $http.post('http://coachclone.springthroughtest.com/odata/Players', $scope.player)
        .success(function(data){
          $location.path('/admin/roster');
        })
        .error(function(){
          alert('Error while creating player');
        });
      }
    }
  }]);

  app.factory('playerList', ['$http', function($http) {
    return {};
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/roster', {
      templateUrl: 'admin/roster.html',
      controller: 'AdminRosterCtrl'
    });

    $routeProvider.when('/admin/roster/add', {
      templateUrl: 'admin/player.html',
      controller: 'AdminPlayerCtrl'
    });

    $routeProvider.when('/admin/roster/:id', {
      templateUrl: 'admin/player.html',
      controller: 'AdminPlayerCtrl'
    });
  }]);



})(angular);
