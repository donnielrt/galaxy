define(
    [
        'flight/lib/component',

        'threejs'
    ],
    function(defineComponent, three) {

        // Sun
        // ---

        // Create a 'Sun' object with properties?

        // The central star of the galaxy, equivalent to the Sun
        var sun;

        // How big the sun's gonna be
        var sRadius = 50;

        // The number of lines drawn horizontally (latitudinal lines)
        var sWidthSegments = 25; // Default 8

        // The number of lines drawn vertically (longitudinal lines)
        var sHeightSegments = 25; // Default 6

        // ...
        var sPhiStart = 0;
        var sPhiLength = Math.PI * 2;
        var sThetaStart = 0;
        var sThetaLength = Math.PI;

        // Sun's texture
        var sTexture;

        // A 'geometry' contains the points (vertices) and fill (faces) of
        // our sun
        var geometry;
        // The material the sun is built with
        var material;

        // The goal is to select a star as the central 'sun' for whatever
        // galaxy we're targeting
        function generateSun() {
            console.log('Placing sun');

            // TODO: Load path from config
            sTexture = THREE.ImageUtils.loadTexture(
                // Shamelessly stolen from Chrome's 100,000 stars experiment
                // TODO: Credits page
                'img/star-surface.png',
                // Mapping to use. Default is UV mapping
                // TODO: Figure out which one is best for our purposes
                undefined,
                function() {
                    console.log('Loaded sun texture');
                }
                );

            // This does...uh...
            sTexture.anisotropy = maxAniso;

            // S? T?
            sTexture.wrapS = sTexture.wrapT = THREE.RepeatWrapping;

            // Draws vertical and horizontal segments creating a sphere
            // The angles define where the drawing starts and till where it
            // continues.
            // TODO: Is the above even correct? Do you even lift, bro?
            geometry = new THREE.SphereGeometry(
                sRadius,
                sWidthSegments,
                sHeightSegments,
                sPhiStart,
                sPhiLength,
                sThetaStart,
                sThetaLength
                );

            // Material the sun is made of. Everbody knows the moon is made
            // of cheese, but a little known fact is that the Sun is made of
            // MeshBasicMaterial, which is a type of milk-byproduct primarily
            // manufactured in Eastern South Korea.
            // TODO: Better material?
            material = new THREE.MeshBasicMaterial({
                // Random orangish color
                color: 0xE9C34A,
                map: sTexture
            });

            console.log("Here comes the Sun!");

            // Merge the sun with the material
            sun = new THREE.Mesh(geometry, material);
            scene.add(sun);
        }

        function sun() {
            console.log("I am the Sun!");
            generateSun();
        }

        return defineComponent(sun);
    }
);
