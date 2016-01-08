define(
    [
        'flight/lib/component',

        'component/scene'
    ],
    function(
        defineComponent,

        scene
    ) {

        function galaxy() {
            console.log('Initializing');
            // ACTION!
            scene.render();
        }

        return defineComponent(galaxy);
    }
);
