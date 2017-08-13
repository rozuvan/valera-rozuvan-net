/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    require.config({
        baseUrl: 'js',
        paths: {
            jquery: '../../js/vendor/jquery/jquery.min'
        }
    });

    require(['jquery'], function ($) {
        $.noConflict();

        console.log('Test in blog.');
    });
}).call(this);
