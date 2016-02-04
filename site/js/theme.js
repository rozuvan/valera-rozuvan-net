(function (undefined) {
    'use strict';

    define(['jquery', 'fitvids', 'isotope', 'tinynav'], function ($, FitVids, Isotope, TinyNav) {
        ///////////////////////////////
        // Set Variables
        ///////////////////////////////
        var gridGutter = 0,
            thumbWidth = 300,
            widgetsHidden = false,
            colW, gridContainer;

        return {
            initialize: initialize
        };

        ///////////////////////////////
        // Initialize Page
        ///////////////////////////////
        function initialize() {
            gridContainer = $('.thumbs.masonry');

            projectThumbInit();
            projectFilterInit();
            $('.videoContainer').fitVids();
            relocateElements();
            setMobileNav();

            $(window).smartresize(function(){
                gridResize();
                sidebarAbsolute();
                relocateElements();
            });
        }

        ///////////////////////////////
        // Mobile Detection
        ///////////////////////////////
        function isMobile() {
            var agent = navigator.userAgent;

            return agent.match(/Android/i) ||
                agent.match(/webOS/i) ||
                agent.match(/iPhone/i) ||
                agent.match(/iPod/i) ||
                agent.match(/iPad/i) ||
                agent.match(/BlackBerry/);
        }

        ///////////////////////////////
        // Project Filtering
        ///////////////////////////////
        function projectFilterInit() {
            $('#filterNav a').click(function () {
                var selector = $(this).attr('data-filter');

                $('#projects .thumbs').isotope({
                    filter: selector,
                    hiddenStyle: {
                        opacity: 0,
                        scale: 1
                    }
                });

                if (!$(this).hasClass('selected')) {
                    $(this).parents('#filterNav').find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                return false;
            });
        }

        ///////////////////////////////
        // Project thumbs
        ///////////////////////////////
        function projectThumbInit() {
            if (!isMobile()) {
                $('.project.small a').hover(
                    function () {
                        $(this).find('.overlay').stop().fadeTo('fast', 0.9);
                        $(this).find('.description').stop().fadeTo('fast', 1);
                        $(this).find('img:last').attr('title', '');
                    },
                    function () {
                        $(this).find('.overlay').stop().fadeTo('fast', 0);
                        $(this).find('.description').stop().fadeTo('fast', 0);
                    }
                );
            }

            setColumns();

            gridContainer.isotope({
                resizable: false,
                layoutMode: 'fitRows',
                masonry: {
                    columnWidth: colW
                }
            });

            $('.project.small').css('visibility', 'visible');
            $('#floatingCirclesG').fadeOut('slow');
        }

        ///////////////////////////////////
        // Theme fixed position adjustment
        ///////////////////////////////////
        function sidebarAbsolute(firstRun) {
            var viewH = $(window).height(),
                screenH = $(document).height(),
                header = $('#header');

            if (header.height() > viewH && header.height() < screenH) {
                if (firstRun) {
                    screenH = screenH + 200;
                }

                header.css({
                    'position': 'absolute',
                    'height': screenH + 'px'
                });
            } else {
                header.attr('style', '');
            }
        }

        ///////////////////////////////////
        // Relocate Elements
        ///////////////////////////////////
        function relocateElements() {
            if($('#container').width() <= 768) {
                $('#sidebar').insertAfter($('#content'));
                widgetsHidden = true;
            } else if(widgetsHidden) {
                $('#sidebar').insertAfter($('#mainNav'));
            }
        }

        ///////////////////////////////
        // Isotope Grid Resize
        ///////////////////////////////
        function setColumns() {
            var columns;

            columns = Math.ceil(gridContainer.width() / thumbWidth);
            colW = Math.floor(gridContainer.width() / columns);

            $('.thumbs.masonry .project.small').each(function (id) {
                $(this).css('width', colW - gridGutter + 'px');
            });
        }

        function gridResize() {
            setColumns();

            gridContainer.isotope({
                resizable: false,
                masonry: {
                    columnWidth: colW
                }
            });
        }

        ///////////////////////////////
        // Mobile Nav
        ///////////////////////////////
        function setMobileNav(){
            $('#mainNav .sf-menu').tinyNav({
                active: 'current-menu-item'
            });
        }
    });
}).call(this);
