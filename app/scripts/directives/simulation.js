'use strict';

angular.module('galaxyApp')
    .directive('simulation', function() {
            // The image is placed on the <canvas>
            function renderImage(context, image) {
                context.drawImage(image, 0, 0);
              }

            return function($scope, $element) {
                // Our <canvas> element in the template
                var canvas = $element[0];
                var context = canvas.getContext('2d');

                // Container for our galaxy background image - the
                // one that we paint the pixels over
                var image = new Image();

                // TODO: Read this from config
                image.src = '/images/milky-way-galaxy.jpg';

                // We should wait till the image is downloaded before
                // attempting to paint it onto the canvas
                image.addEventListener('load', function() {
                    renderImage(context, image);
                  }, false);
              };
          });