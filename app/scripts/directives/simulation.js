'use strict';

angular.module('galaxyApp')
    .directive('simulation', function() {
        // Since we want to modify the DOM, we create a link function
        // TODO: Is this the best way to render this?
        // TODO: Is the simulation suited best in the controller, or in the 
        // directive?
        function link($scope, $element) {
            
            // DOM Element
            // -----------

            // The container for the <canvas> we produce
            var element = $element[0];
            // Container dimensions
            var width;
            var height;

            // Three.js objects
            // ----------------

            var scene;
            var camera;
            var renderer;
            var light;
            var controls;

            // Scene settings
            // --------------

            var aspectRatio;
            var cameraPosition = {
                x: 0,
                y: 0,
                z: 5
            };
            var fieldOfView = 75;
            // The closest object from the camera that's rendered
            var nearPlane = 0.1;
            // The farthest object from the camera that's rendered
            var clippingPlane = 1000;

            // Actors
            // ------

            // The object that refers to the cube we render
            var cube;
            // A 'geometry' contains the points (vertices) and fill (faces) of 
            // the cube
            var geometry;
            // The material the cube is built with
            var material;

            // Create the three.js objects we need
            function prepareScene() {
                console.log('Preparing scene');

                // The container doesn't have any width/height specified by default
                width = parseFloat(getComputedStyle(element)
                    .width.replace(/px/, ''));
                height = parseFloat(getComputedStyle(element)
                    .height.replace(/px/, ''));
                aspectRatio = width / height;

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(
                    fieldOfView, aspectRatio, nearPlane, clippingPlane);

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(width, height);

                element.appendChild(renderer.domElement);
            }

            // Place objects on the scene
            function paintCanvas() {
                console.log('Placing objects');

                // Build a 1x1x1 cube made of MeshBasicMaterial and add it to 
                // the scene. 
                geometry = new THREE.CubeGeometry(1,1,1);
                material = new THREE.MeshBasicMaterial({ 
                    color: 0xcccccc,
                    wireframe: true
                });

                // Merge the cube with the material
                cube = new THREE.Mesh(geometry, material);
                scene.add( cube );

                // Pan the camera out from 0, 0, 0
                camera.position.z = cameraPosition.z;

                // Controls to move the scene
                controls = new THREE.OrbitControls(camera, renderer.domElement);
              }

            // Animation loop
            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
                controls.update();
            }

            // Program flow begins here
            function init() {
                console.log('Initializing');
                prepareScene();
                paintCanvas();
                console.log('Preparing to render');
                render();
              }

            init();
          }

        return {
          link: link
        };
      });