'use strict';

angular.module('galaxyApp')
  .controller('Nav', function ($scope) {
      // TODO: Find a better way to link nav and controllers
      $scope.nav = {
        'Main': {
          link: '/#/',
          text: 'Home',
          class: 'active'
        },
        'Simulation': {
          link: '/#/simulation/',
          text: 'Simulation',
          class: ''
        }
      };

      // TODO: Promise, maybe?
      $scope.$on('$routeChangeSuccess', function(event, current) {
        var currentController = current.$$route.controller;
        // Find nav item with current controller, and set its 
        // active class
        for(var controller in $scope.nav) {
          if($scope.nav.hasOwnProperty(controller)) {
            // We're using this controller, set corresponding
            // nav item
            $scope.nav[controller].class =
              controller === currentController ? 'active' : '';
          }
        }
      });

    });