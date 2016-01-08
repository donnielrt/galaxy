define(['component/galaxy'],
function (galaxy) {

    'use strict';

    /**
    * Module function
    */
    function initialize() {
        // The container for the <canvas> we produce
        var element = $('#simulation')[0];
        galaxy.attachTo(element);
    }

    return initialize;
});
