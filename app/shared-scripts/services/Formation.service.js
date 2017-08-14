angular
    .module('coachClone.formation.service', ['coachClone.server', 'coachClone.model'])
    .service('FormationService', ['ServerService', 'Formation', '$q', function (ServerService, Formation, $q) {
            var formations = [];

            function get(numberOfPlayers){
                if (formations[numberOfPlayers]) {
                    return formations[numberOfPlayers];
                }
            }

            function collect() {
                return $q(function (resolve, reject) {
                    if (formations.length > 0) {
                        return resolve(formations);
                    }

                    ServerService.formations.get().$promise.then(function(data){
                        for (i = 0; i < data.value.length; i += 1) {
                            formations.push(new Formation(data.value[i]));
                        }

                        resolve(formations);
                    }).catch(function(err) {
                        console.log('Error Collecting Formations: ' + err);
                        reject(err);
                    });
                });
            }

            return {
                get: get,
                collect: collect
            };
        }]);
