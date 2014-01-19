'use strict';

angular.module('galaxyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider) {
    $routeProvider
      // Home page
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'Main'
      })
      // Simulation page
      .when('/simulation/', {
          templateUrl: 'views/simulation.html',
          controller: 'Simulation'
        })
      .otherwise({
          redirectTo: '/'
        });
  });