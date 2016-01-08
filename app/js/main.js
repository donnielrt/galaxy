'use strict';

requirejs.config({
  baseUrl: 'bower_components',
  paths: {
    'jquery': 'jquery/dist/jquery',

    'component': '../js/component',
    'page': '../js/page',

    'threejs': 'threejs/build/three',
    'orbit-controls': '../js/vendor/orbit-controls',
  },
  shim: {
    'threejs': {
      exports: 'THREE'
    },
    'orbit-controls': {
      deps: ['threejs']
    }
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug',

    'jquery'
  ],

  function(compose, registry, advice, withLogging, debug, $) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
