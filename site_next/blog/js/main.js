/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    var $;

    var selectedTags = {
        javascript: false,
        software: false,
        process: false,
        writing: false,
        reading: false,
        linux: false,
        emacs: false,
        sport: false,
        music: false,
        mathematics: false,
        programming: false,
        photography: false,
        world: false,
        blog: false,
        projects: false,
        concept: false
    };

    var tagsToArticles = {
        javascript: [],
        software: [],
        process: [],
        writing: [],
        reading: [],
        linux: [],
        emacs: [],
        sport: [],
        music: [],
        mathematics: [],
        programming: [],
        photography: [],
        world: [],
        blog: [],
        projects: [],
        null: [],
        concept: []
    };

    var numOfSelectedTags = 0;

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: '../../js/vendor/jquery/jquery.min'
        }
    });

    function makeid() {
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz';
        var i;

        for (i = 0; i < 7; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    function hideAllPosts() {
        $('ul.blog_posts li').hide();
    }

    function showAllPosts() {
        $('ul.blog_posts li').show();
    }

    function showAllPostsForSelectedTags(tag) {
        var tag2, articles, c1;

        if (typeof tag !== 'undefined') {
            articles = tagsToArticles[tag];

            for (c1 = 0; c1 < articles.length; c1 += 1) {
                $('#' + articles[c1]).show();
            }

            return;
        }

        var tag, articles, c1;

        for (tag in selectedTags) {
            if (selectedTags.hasOwnProperty(tag)) {
                if (selectedTags[tag] === true) {
                    articles = tagsToArticles[tag];

                    for (c1 = 0; c1 < articles.length; c1 += 1) {
                        $('#' + articles[c1]).show();
                    }
                }
            }
        }
    }

    function processBlogPostsLink(index) {
        var el = $(this);
        var parent = el.parent();
        var tags = el.data('tags');
        var itemId = makeid();
        var c1, tag;

        if ((typeof tags === 'string') && (tags.length > 0)) {
            tags = tags.split(' ');
        } else {
            tags = ['null'];
        }

        parent.attr('id', itemId);

        for (c1 = 0; c1 < tags.length; c1 += 1) {
            tag = tags[c1];
            tagsToArticles[tag].push(itemId);
        }
    }

    function onTagButtonClick(event) {
        event.preventDefault();

        var el = $(event.target);
        var tag = el.data('tag');

        if (selectedTags[tag] === false) {
            selectedTags[tag] = true;
            el.addClass('selected');

            numOfSelectedTags += 1;

            if (numOfSelectedTags === 1) {
                hideAllPosts();
            }

            showAllPostsForSelectedTags(tag);
        } else {
            selectedTags[tag] = false;
            el.removeClass('selected');

            numOfSelectedTags -= 1;

            if (numOfSelectedTags === 0) {
                showAllPosts();
            } else {
                hideAllPosts();
                showAllPostsForSelectedTags();
            }
        }
    }

    require(['jquery'], function (_$) {
        $ = _$;

        $.noConflict();

        $('ul.blog_posts li a').each(processBlogPostsLink);
        $('.main a.btn').on('click', onTagButtonClick);
    });
}).call(this);
