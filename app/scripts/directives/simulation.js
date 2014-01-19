'use strict';

angular.module('galaxyApp')
    .directive('simulation', function() {
        // Since we want to modify the DOM, we create a link function
        function link($scope, $element) {
            // Our <canvas> element in the template
            var canvas = $element[0];

            // The image is placed onto the <canvas>
            function paintCanvas(image) {
                var context = canvas.getContext('2d');
                // <canvas> uses the actual HTML width and height in its coordinate
                // system instead of using the styled width/heights. So we set the
                // HTML dimensions to the styled dimensions.
                // Unfortunately, this is a String pixel value that we have to massage
                var cWidth = parseInt(getComputedStyle(canvas).width
                  .replace(/px/, ''), 10);
                var cHeight = parseInt(getComputedStyle(canvas).height
                  .replace(/px/, ''), 10);

                canvas.width = cWidth;
                canvas.height = cHeight;

                // Draw it!
                context.drawImage(image, 0, 0, cWidth, cHeight);
              }

            // Download image, and thus start the render
            function init() {
                // Container for our galaxy background image - the
                // one that we paint the pixels over
                var image = new Image();

                // We should wait till the image is downloaded before
                // attempting to paint it onto the canvas
                image.addEventListener('load', function() {
                      paintCanvas(image);
                    },
                    false);

                // TODO: Set this in config
                // Load the image
                image.src = '/images/milky-way-galaxy.jpg';
              }

            init();
          }

        return {
          link: link
        };
      });