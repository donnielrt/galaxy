define(
    [
        'flight/lib/component',
    ],
    function(defineComponent) {

        console.log('Utils');

        // Extract the dimensions as specified in CSS (as opposed to the
        // element's width/height attributes in DOM)
        this.getStyledDimensions = function(el) {
            var styles = getComputedStyle(el);
            return {
                width: parseFloat(styles.width.replace(/px/, '')),
                height: parseFloat(styles.height.replace(/px/, ''))
            };
        }

        function utilities() {

        }

        return defineComponent(utilities);
    }
);
