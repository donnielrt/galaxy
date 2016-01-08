define(
    [
        'flight/lib/component',

        'threejs',
        'orbit-controls',

        'component/utilities'
    ],
    function(defineComponent, three, orbit, utils) {

        var element = $('#simulation')[0];

        // Three.js objects
        // ----------------

        var threeScene;
        var camera;
        var renderer;
        var light;

        // Scene settings
        // --------------

        var aspectRatio;

        // How much of the scene we can see, width-wise.
        var fieldOfView = 75;

        // Note: Confirm understanding of near plane and clipping plane

        // The closest object from the camera that's rendered
        var nearPlane = 0.1;
        // The farthest object from the camera that's rendered
        var clippingPlane = 1000;

        // Remember that we are 'dollying' the camera through the Z-plane,
        // not zooming in/out
        var cameraPosition = {
            x: 0,
            y: 0,
            // We can dolly out another clippingPlane/2 units, and dolly in
            // (clippingPlane/2 + clippingPlane) units
            z: clippingPlane/2
        };

        // It's obvious what this is and does. Duh. Can't believe you even
        // asked.
        var maxAniso = 1;

        // Gotta figure out how this works best. Are we just interested in
        // the element dimensions? Context dimensions?
        var width;
        var height;

        // Create the three.js objects we need
        this.prepareScene = function() {
            console.log('Preparing scene');

            // The container doesn't have any width/height specified on
            // it, so we extract the CSS width/height
            // var elementDimensions = utils.getStyledDimensions(element);
            // width = elementDimensions.width;
            // height = elementDimensions.height;

            // TEMP
            width = getComputedStyle(element).width.replace(/px/, '');
            height = getComputedStyle(element).height.replace(/px/, '');

            aspectRatio = width / height;

            threeScene = new THREE.Scene();

            // Why perspective camera?
            camera = new THREE.PerspectiveCamera(
                fieldOfView,
                aspectRatio,
                nearPlane,
                clippingPlane
                );

            // Does it make a difference if we set properties after creation?
            // Does it repaint/re-render?
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);

            // Explicitly set a black background
            renderer.setClearColor(0x0000, 1);

            // Pan the camera out from 0, 0, 0
            camera.position.z = cameraPosition.z;

            // Controls to move the scene
            controls = new THREE.OrbitControls(camera, renderer.domElement);

            // Let Orbit know we're targeting the center (it's the default,
            // but let's be explicit). Worth trying different positions later.

            controls.target = new THREE.Vector3(0, 0, 0);

            // How far we can dolly in-out
            controls.minDistance = -1*clippingPlane;
            controls.maxDistance = clippingPlane;

            // Gets confusing with panning
            controls.noPan = true;

            // Orbit around the sun (whee!)
            controls.autoRotate = false;
            controls.rotateSpeed = 0.2;

            // Inject the element into the DOM
            element.appendChild(renderer.domElement);
        }

        // Animation loop
        this.render = function() {
            // raf is da bomb
            requestAnimationFrame(render);
            // Wait, why doesn't this happen in render()?
            renderer.render(threeScene, camera);
            // Update to account for Orbit changes to perspective
            controls.update();
        }

        function scene() {
            console.log("I am the scene!");
            prepareScene();
        }

        return defineComponent(scene);
    }
);
