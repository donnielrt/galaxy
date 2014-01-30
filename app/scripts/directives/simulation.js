'use strict';

angular.module('galaxyApp')
    .directive('simulation', function() {
        // Since we want to modify the DOM, we create a link function
        function link($scope, $element) {
            // Our <canvas> element in the template
            var canvas = $element[0];
            var context = canvas.getContext('2d');

            // The background image
            var background;

            // The zoom box
            var box;
            var boxWidth = 300;
            var boxHeight = 100;

            function prepareCanvas() {
                // <canvas> uses the actual HTML width and height in its coordinate
                // system instead of using the styled width/heights. So we set the
                // HTML dimensions to the styled dimensions.
                var cWidth = parseInt(getComputedStyle(canvas).width
                  .replace(/px/, ''), 10);
                var cHeight = parseInt(getComputedStyle(canvas).height
                  .replace(/px/, ''), 10);

                canvas.width = cWidth;
                canvas.height = cHeight;

                background  = new CanvasLayers.Container(canvas, false);

                box = new CanvasLayers.Layer(0, 0, boxWidth, boxHeight);

                // Draw the box on top of the canvas
                background.getChildren().add(box);

                box.onRender = function(layer, rect, context) {
                    context.strokeStyle = '#fff';
                    // context.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    // context.fillRect(0, 0, boxWidth, boxHeight);
                    context.strokeRect(0, 0, boxWidth, boxHeight);
                };
            }

            // The image is placed onto the <canvas>
            function paintCanvas(image) {
                background.onRender = function(layer, rect, context) {
                    // Draw the image on to the canvas
                    context.drawImage(image, 0, 0, layer.getWidth(), layer.getHeight());
                };

                background.redraw();
              }

            // Load our background image which we'll base the simulation on
            function loadSource() {
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

            // Show a rectangle over a zoomable area
            function getZoomBounds(x, y) {
                var bounds = {
                    left: 0,
                    right: canvas.width,
                    top: 0,
                    bottom: canvas.height
                };

                // Try and center the rectangle on x, y
                var left = Math.max(bounds.left, x - (boxWidth/2));
                var top = Math.max(bounds.top, y - (boxHeight/2));

                // TODO: Account for right and bottom bounds too

                return {
                    left: left,
                    top: top
                };
            }

            // Zoom into a section of the image
            function zoom() {
                var imageData = context.getImageData(box.getX(), box.getY(), boxWidth, boxHeight);  
                // var pixels = imageData.data;

                background.onRender = function(layer, rect, context) {
                    // Clear out box

                    // Draw image data onto whole canvas
                    context.clearRect(0, 0, canvas.width, canvas.height);  
                    context.putImageData(imageData, 0, 0);
                };

                background.redraw();
            }

            // Bind handlers for our events
            function bindEvents() {
                // Show the zoom bounds over the given area
                function hover(x, y) {
                    // Note: The canvas-layers plugin automatically bounds the 
                    // box to the background container
                    box.moveTo(x, y);
                    background.redraw();
                }

                // Hover handler
                canvas.addEventListener('mousemove', function(e) {
                    // Zoom into specified section
                    hover(e.offsetX, e.offsetY);
                }, false);

                // Click handler
                canvas.addEventListener('click', function(e) {
                    // Zoom into currently highlighted section
                    zoom();
                }, false);
            }

            // Download image, and thus start the render
            function init() {
                prepareCanvas();
                loadSource();
                bindEvents();
              }

            init();
          }

        return {
          link: link
        };
      });