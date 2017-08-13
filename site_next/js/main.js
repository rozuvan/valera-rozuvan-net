/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    var Typed, $;

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            typed: 'vendor/typed/typed.min'
        }
    });

    require(['jquery', 'typed'], function (_$, _Typed) {
        $ = _$;
        Typed = _Typed;

        $.noConflict();

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());

        typeFirstSentence();
    });

    function typeFirstSentence() {
        var options = {
            strings: ['You have reached ^300 the home page of ^100 Valera ^130 Rozuvan.'],
            typeSpeed: 40,
            showCursor: false,
            autoInsertCss: false,
            onComplete: function () {
                $('.main').animate({
                    height: '250px'
                }, 400, 'swing', function () {
                    typeSecondSentence();
                });
            }
        }

        var typed = new Typed('.intro_element_a', options);
    }

    function typeSecondSentence() {
        var options = {
            strings: ['Here is an ^200 animation for you ^100 ...'],
            typeSpeed: 40,
            showCursor: false,
            autoInsertCss: false,
            onComplete: function () {
                randomAnimation();
            }
        }

        var typed = new Typed('.intro_element_b', options);
    }

    function randomAnimation() {
        $('.main').animate({
            height: '490px'
        }, 400, 'swing', function () {
            var newCanvas = $('<canvas />', {
                class: 'random_animation',
                id: 'random_animation_canvas'
            }).width(300).height(240);

            newCanvas[0].width = 300;
            newCanvas[0].height = 240;

            $('.main').append(newCanvas);

            // Set up!
            var canvas = document.getElementById('random_animation_canvas');
            var context = canvas.getContext('2d');

            var state = {
                x: 0, y: 0, direction: 1
            };

            draw(state, context);

            var startTime = (new Date()).getTime();
            animate(state, canvas, context, startTime);
        });
    }

    function animate(state, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var linearSpeed = 100;
        // pixels / second
        var newX = linearSpeed * time / 1000;

        if (newX > 100) {
            if (state.direction === 1) {
                state.direction = -1;
            } else {
                state.direction = 1;
            }

            startTime = (new Date()).getTime();
        } else {
            if (state.direction === 1) {
                state.x = newX;
            } else {
                state.x = 100 - newX;
            }
        }

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw(state, context);

        // request new frame
        requestAnimFrame(function() {
            animate(state, canvas, context, startTime);
        });
    }

    function draw(state, context) {
        // Draw the face
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(95 + state.x, 85 + state.y, 40, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = '#02242d';

        // Draw the left eye
        context.beginPath();
        context.arc(75 + state.x, 75 + state.y, 5, 0, 2*Math.PI);
        context.closePath();
        context.fill();

        // Draw the right eye
        context.beginPath();
        context.arc(114 + state.x, 75 + state.y, 5, 0, 2*Math.PI);
        context.closePath();
        context.fill();

        // Draw the mouth
        context.beginPath();
        context.arc(95 + state.x, 90 + state.y, 26, Math.PI, 2*Math.PI, true);
        context.closePath();
        context.fill();

        // Write "Hello, World!"
        context.font = '30px Garamond';
        context.fillText('Hello, World!', 15 + state.x, 175 + state.y);
    }
}).call(this);
