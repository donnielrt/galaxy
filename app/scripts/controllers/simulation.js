'use strict';

angular.module('galaxyApp')
    // TODO: Add config service
    .controller('Simulation', 
        function ($scope, $http) {
            var simulation = $scope.simulation = {};

            // Reads the source galaxy image
            var readImage = function() {
                $http({ 
                    method: 'GET', 
                    url: 'images/milky-way-galaxy.jpg'
                }).success(function(data, status, headers, config) {
                    simulation.image = data;
                    processImage();
                }).error(function(data, status, headers, config) {
                    console.log("Error :(");
                });
            };

            // Read the pixels of the image and create
            // corresponding pixel data
            var processImage = function() {
                simulation.pixels = [];
                draw();
            };

            // Output simulation to the template
            var draw = function() {
                simulation.canvas = 'Hello World!';
            };

            var init = function() {
                readImage();
            };

            // The magic begins here
            // TODO: Make these promises
            init();
        });