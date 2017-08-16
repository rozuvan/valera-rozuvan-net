/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    var $, CodeMirror;

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: '../../../js/vendor/jquery/jquery.min'
        },
        packages: [{
            name: 'codemirror',
            location: '../../../js/vendor/codemirror',
            main: 'lib/codemirror'
        }]
    });

    require(['jquery', 'codemirror', 'codemirror/mode/javascript/javascript'], function (_$, _CodeMirror) {
        $ = _$;
        CodeMirror = _CodeMirror;

        $.noConflict();

        init();
    });

    function init() {
        editor = CodeMirror.fromTextArea(document.getElementById('code'), {
            mode: 'text/javascript',
            lineNumbers: true,
            readOnly: true
        });
    }
}).call(this);
