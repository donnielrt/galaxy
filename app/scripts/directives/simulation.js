'use strict';

angular.module('galaxyApp')
    .directive('simulation', function() {
            // Container for our galaxy background image - the
            // one that we paint the pixels over
            var image = new Image();

            // TODO: Set this in config
            image.src = '/images/milky-way-galaxy.jpg';

            // The image is placed onto the <canvas>
            function renderImage(context, image, cWidth, cHeight) {
                context.drawImage(image, 0, 0, cWidth, cHeight);
              }

            // Since we want to modify the DOM, we create a link function
            function link($scope, $element) {
                // Our <canvas> element in the template
                var canvas = $element[0];
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

                // We should wait till the image is downloaded before
                // attempting to paint it onto the canvas
                image.addEventListener('load', function() {
                    renderImage(context, image, cWidth, cHeight);
                  }, false);
              }

            // Note: $element seems to only be accessible in the returned
            // function, not in the directive directly
            return {
              link: link
            };
          });