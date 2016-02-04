/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function (undefined) {
    // Mock the `console.log()` method so that browsers that don't have this
    // debugging facility don't break.
    if (!window.console) {
        window.console = {};
    }
    if (!window.console.log) {
        window.console.log = function consoleLog() {};
    }

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            superfish: 'vendor/superfish',
            fitvids: 'vendor/jquery.fitvids',
            isotope: 'vendor/jquery.isotope.min',
            tinynav: 'vendor/tinynav.min',
            theme: 'theme',
            get_tweets: 'get_tweets',
            google_analytics: 'google_analytics'
        },
        shim: {
            superfish: {
                deps: [
                    'jquery'
                ],
                exports: 'jQuery.fn.superfish'
            },
            fitvids: {
                deps: [
                    'jquery'
                ],
                exports: 'jQuery.fn.fitVids'
            },
            isotope: {
                deps: [
                    'jquery'
                ],
                exports: 'jQuery.fn.isotope'
            },
            tinynav: {
                deps: [
                    'jquery'
                ],
                exports: 'jQuery.fn.tinyNav'
            }
        }
    });

    require(
        ['jquery', 'superfish', 'theme', 'get_tweets', 'google_analytics'],
        function ($, Superfish, Theme, GetTweets, GoogleAnalytics)
    {
        $(document).ready(onReady);

        return;

        function onReady() {
            Theme.initialize();

            $('ul.sf-menu').supersubs({
                minWidth: 8, // minimum width of sub-menus in em units
                maxWidth: 15, // maximum width of sub-menus in em units
                extraWidth: 1 // extra width can ensure lines don't sometimes turn over
                              // due to slight rounding differences and font-family
            }).superfish({
                delay: 400,
                animation: {
                    opacity: 'show',
                    height: 'show'
                },
                speed: 'fast',
                autoArrows: true,
                dropShadows: true
            });

            // GetTweets.get();

            GoogleAnalytics.initialize();
        }
    });
}).call(this);
