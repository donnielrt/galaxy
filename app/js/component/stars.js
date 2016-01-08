define(
    [
        'flight/lib/component',

        'threejs'
    ],
    function(defineComponent, three) {
        // Stars
        // -----

        var particleSystem;
        var numStars = 10000;

        // TODO: Should place a point taking into account the source data,
        // i.e. the image of the galaxy, or possibly star data?
        function generateStars() {
            // Create the particle variables
            var particleCount = numStars;
            var particles = new THREE.Geometry();

            // Better material? Does it matter? Right now the particles are
            // tiny, at 1 unit. Can they be made spherical? Could they emit
            // light? Do dogs dream?
            var pMaterial = new THREE.ParticleBasicMaterial({
                color: 0xFFFFFF,
                size: 1
            });

            var particle;

            // Create the individual particles
            for (var p = 0; p < particleCount; p++) {

                // create a particle with random
                // position values the size of the current element size
                var pX = (Math.random() * width * 3) -
                (Math.random() * width * 3);
                var pY = (Math.random() * height * 3) -
                (Math.random() * height * 3);
                var pZ = (Math.random() * clippingPlane * 3) -
                (Math.random() * clippingPlane * 3);

                // We reuse this in the loop since it's stored in particles
                // We don't want those copies duplicated for no reason.
                // Memory doesn't grow on trees.
                particle = new THREE.Vector3(pX, pY, pZ);

                // add it to the geometry
                particles.vertices.push(particle);
            }

            // create the particle system
            particleSystem = new THREE.ParticleSystem(
                particles, pMaterial
            );

            // Add it to the scene
            scene.add(particleSystem);
        }

        function stars() {
            console.log("I am the stars!");
            generateStars();
        }

        return defineComponent(stars);
    }
);
