'use strict';

// Declare app level module which depends on filters, and services
angular.module('coachClone', [
    'coachClone.home',
    'coachClone.config',
    'coachClone.rollcall',
    'coachClone.formation',
    'coachClone.playerPositions',
    'coachClone.model',
    'coachClone.formation.service',
    'coachClone.roster.service',
    'coachClone.server',
    'ngResource',
    'coachClone.admin',
    'coachClone.admin.roster',
    'coachClone.summary',
    'coachClone.fieldedPlayerPicker',
    'coachClone.benchPicker',
    'coachClone.game.gametime',
    'coachClone.game.gamestats'
  ]);
