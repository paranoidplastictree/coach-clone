(function (angular) {
  "use strict";

  var app = angular.module('coachClone.chat', ['ngRoute']);

  app.controller('ChatCtrl', ['$scope', 'messageList', function($scope, messageList) {
      $scope.messages = messageList;
      $scope.addMessage = function(newMessage) {
        if( newMessage ) {
          $scope.messages.$add({text: newMessage});
        }
      };
    }]);


  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl'
    });
  }]);

})(angular);
