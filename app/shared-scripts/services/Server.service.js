(function () {
    var app = angular.module('coachClone.server', []);

    app.service('ServerService', ['$resource', '$q', function ($resource, $q) {
            var formations,
                roster,
                game,
                url = 'http://coachclone.springthroughtest.com/odata';

            formations = $resource(url + '/Formations', {},
                {
                    'get': {
                        method: 'GET',
                        isArray: false
                    }
                });

            roster = $resource(url + '/Players', {},
                {
                    'get': {
                        method: 'GET',
                        isArray: false
                    },
                    'post': {
                        method: 'POST',
                        isArray: false,
                        params: {
                            id: '@id'
                        }
                    },
                    'put': {
                        method: 'PUT',
                        isArray: false
                    }
                });

            game = $resource(url + '/games', {},
                {
                    'get': {
                        method: 'GET',
                        isArray: false
                    },
                    'post': {
                        method: 'POST',
                        isArray: false
                    }
                });

            settings = $resource(url + '/settings', {},
                    {
                        'get': {
                            method: 'GET',
                            isArray: false
                        },
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });

            return {
                formations: formations,
                roster: roster,
                game: game,
                settings: settings
            };
        }]);

})();
