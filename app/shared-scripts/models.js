(function () {
    var app = angular.module('coachClone.model', []);

    function extend(object, properties) {
        var attr;

        for (attr in properties) {
            if (properties.hasOwnProperty(attr)){
                object[attr] = properties[attr];
            }
        }
    }

    app.factory('Formation', [function () {

                function Formation(properties) {
                    extend(this, properties);
                }

                return Formation;
            }]);

    app.factory('Game', [function () {

            function Game(properties) {
                extend(this, properties);
            }

            return Game;
        }]);

    app.factory('Player', [function () {

            function Player(properties) {
                extend(this, properties);
                this.NextPosition = null;
                this.CurrentPosition = null;
                this.PositionStartTime = null;
            }

            Player.prototype.IncrementTimes = function() {
              var now = new Date();
              if (this.CurrentPosition !== null) {
                  for (attr in this) {
                      if (attr.toLowerCase() === (this.CurrentPosition + 'time').toLowerCase()) {
                          difference = this.PositionStartTime ? Math.round((now - this.PositionStartTime) / 1000) : 0;
                          this[attr] = this[attr] + difference;
                          break;
                      }
                  }
              }
            }

            return Player;
        }]);

})();
