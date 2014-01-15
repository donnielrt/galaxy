'use strict';

angular.module('galaxyApp')
    // TODO: Add config service
    .controller('Simulation', 
        function ($scope, $resource) {
            var simulation = $scope.simulation = {};

            // Reads the source galaxy image
            var readImage = function() {
                // TODO: Convert this to a factory
                var image = $resource('images/milky-way-galaxy.jpg', {}, {
                    query: {
                        method: 'GET'
                    }
                });

                simulation.image = image.query();
                simulation.image.$promise.then(function(image) {
                    console.log("Image: ", image);
                });
            };

            // Read the pixels of the image and create
            // corresponding pixel data
            var processImage = function() {
                simulation.pixels = [];
            };

            // Output simulation to the template
            var draw = function() {
                simulation.canvas = 'Hello World!';
            };

            // The magic begins here
            // TODO: Make these promises
            readImage();
            processImage();
            draw();
        });