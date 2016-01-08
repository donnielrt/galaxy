define(
    [
        'flight/lib/component'

    ],
    function(defineComponent) {
        var controls;

        // Reset to 0, 0, 0
        // TODO: Animated reset! Sound-effects! Explosions!
        function reset() {
            console.log("Resetting!");

            camera.position.x = cameraPosition.x;
            camera.position.y = cameraPosition.y;
            camera.position.z = cameraPosition.z;

            controls.update();
        }

        // wow. such full screen. much delight.
        // TODO: Shouldn't live here. Utilities?
        function fullScreen() {
            var simulationElement = renderer.domElement;
            var elementDimensions;

            if (simulationElement.requestFullscreen) {
                simulationElement.requestFullscreen();
            } else if (simulationElement.msRequestFullscreen) {
                simulationElement.msRequestFullscreen();
            } else if (simulationElement.mozRequestFullScreen) {
                simulationElement.mozRequestFullScreen();
            } else if (simulationElement.webkitRequestFullscreen) {
                simulationElement.webkitRequestFullscreen();
            }

            elementDimensions = getStyledDimensions(element);

            // How do we redraw the scene to take up the entire screen?

            // Update the global width for use by other methods
            // width = elementDimensions.width;
            // height = elementDimensions.height;

            // element.width = simulationElement.width = width;
            // element.height = simulationElement.height = height;

            // renderer.setSize(width, height);
        }

        function controls() {
            console.log("I am the controls!");
        }

        return defineComponent(controls);
    }
);
