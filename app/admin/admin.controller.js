(function (angular) {
  "use strict";

  var app = angular.module('coachClone.admin', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin', {
      templateUrl: 'admin/index.html'
    });
  }]);

})(angular);
