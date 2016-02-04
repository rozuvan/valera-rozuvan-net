/**
 * Use this script if you need to support IE 7, and IE 6.
 */

window.onload = function () {
    var icons = {
            'icon-google-plus': '&#xe000;',
            'icon-linkedin': '&#xe001;',
            'icon-facebook': '&#xe002;',
            'icon-twitter': '&#xe003;'
        },
        els = document.getElementsByTagName('*'),
        i, attr, c, el;

    for (i = 0; i < els.length; i += 1) {
        el = els[i];
        attr = el.getAttribute('data-icon');

        if (attr) {
            addIcon(el, attr);
        }

        c = el.className;
        c = c.match(/icon-[^\s'"]+/);

        if (c && icons[c[0]]) {
            addIcon(el, icons[c[0]]);
        }
    }

    return;

    function addIcon(el, entity) {
        var html = el.innerHTML;

        el.innerHTML = '' +
            '<span style="font-family: \'icomoon\'">' +
                entity +
            '</span>' +
            html;
    }
};
