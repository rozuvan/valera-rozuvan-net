/*
 *
 * Original source:
 *
 *   https://github.com/mrdoob/three.js/blob/0bf19e93a3c9e5bd531ab025e32af8e59d97bbe7/examples/webgl_geometry_text_shapes.html
 *
 * (with some modifications)
 *
 **/
(function () {

  var camera, scene, renderer;

  (function (exports, d) {
    function domReady(fn, context) {

      function onReady(event) {
        d.removeEventListener('DOMContentLoaded', onReady);
        fn.call(context || exports, event);
      }

      function onReadyIe(event) {
        if (d.readyState === 'complete') {
          d.detachEvent('onreadystatechange', onReadyIe);
          fn.call(context || exports, event);
        }
      }

      d.addEventListener && d.addEventListener('DOMContentLoaded', onReady) ||
        d.attachEvent && d.attachEvent('onreadystatechange', onReadyIe);
    }

    exports.domReady = domReady;
  })(window, document);

  domReady(function () {

    if (!Detector.webgl) {
      simple();

      return;
    }

    init();
    animate();

  });

  function getEmail() {
    var eMailLetters = [
      'v', 'a', 'l', 'e', 'r', 'a', // UIgyu.63t7^**YO
      '.', // ^&*UO5t@73.u4^R%%&I$6 7 t 76R% ^
      'r', 'o', 'z', 'u', 'v', 'a', 'n', // %$^*&.()
      '@', //   7 &&*  66.  6 67786 ^$@#@#$.%^*
      'g', 'm', 'a', 'i', 'l', // // # @@ /
      '.', /* sjfhf 79 *@  &*879 3467. ^%^&^%&*  */
      'c', 'o', 'm' // @@@.
    ];

    return eMailLetters.join('');
  }

  function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-900, 600, 1200);

    var controls = new THREE.OrbitControls(camera);
    controls.target.set(0, 0, 0);
    controls.update();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e1e0);

    var loader = new THREE.FontLoader();
    loader.load('data/helvetiker_regular.typeface.json', function (font) {

      var xMid, text, i;

      var textShape = new THREE.BufferGeometry();

      var color = 0x006699;

      var matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });

      var matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });

      var message = '   e-mail:\n' + getEmail();

      var shapes = font.generateShapes(message, 100, 2);

      var geometry = new THREE.ShapeGeometry(shapes);

      geometry.computeBoundingBox();

      xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

      geometry.translate(xMid, 0, 0);

      // make shape ( N.B. edge view not visible )

      textShape.fromGeometry(geometry);

      text = new THREE.Mesh(textShape, matLite);
      text.position.z = - 150;
      scene.add(text);

      // make line shape ( N.B. edge view remains visible )

      var holeShapes = [];

      for (i = 0; i < shapes.length; i++) {

        var shape = shapes[i];

        if (shape.holes && shape.holes.length > 0) {

          for (var j = 0; j < shape.holes.length; j++) {

            var hole = shape.holes[j];
            holeShapes.push(hole);

          }

        }

      }

      shapes.push.apply(shapes, holeShapes);

      var lineText = new THREE.Object3D();

      for (i = 0; i < shapes.length; i++) {

        var shape2 = shapes[i];

        var points = shape2.getPoints();
        var geometry2 = new THREE.BufferGeometry().setFromPoints(points);

        geometry2.translate(xMid, 0, 0);

        var lineMesh = new THREE.Line(geometry2, matDark);
        lineText.add(lineMesh);

      }

      scene.add(lineText);

    }); //end load function

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth - 10, window.innerHeight - document.getElementsByClassName('footer')[0].clientHeight - 10);
    document.getElementById('three_js_output').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

  } // end init

  function onWindowResize() {

    camera.aspect = getHeight() / getWidth();
    camera.updateProjectionMatrix();

    renderer.setSize(getHeight(), getWidth());

  }

  function getHeight() {

    return window.innerWidth - 10;

  }

  var cachedEl = null;

  function getWidth() {

    if (!cachedEl) {
      cachedEl = document.getElementsByClassName('footer')[0];
    }

    return window.innerHeight - cachedEl.clientHeight - 10;

  }

  function simple() {
    var el = document.getElementById('simple_email_container');
    var className = 'hidden';
    var pattern = new RegExp('(^| )'+ className +'($| )','g');

    el.className = el.className.replace(pattern, '').trim();

    el = document.getElementById('three_js_output');
    className = 'no_select';
    pattern = new RegExp('(^| )'+ className +'($| )','g');

    el.className = el.className.replace(pattern, '').trim();

    el = document.getElementById('simple_email_output');
    el.innerHTML += 'email:<br />' + getEmail();
  }

  function animate() {

    requestAnimationFrame(animate);

    render();

  }

  function render() {

    renderer.render(scene, camera);

  }

})();
