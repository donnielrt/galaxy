'use strict';

angular.module('galaxyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'Main'
      })
      .when('/simulation/', {
          templateUrl: 'views/simulation.html',
          controller: 'Simulation'
        })
      .otherwise({
          redirectTo: '/'
        });
  });