(function () {

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

domReady(initArchive);

function initArchive() {

    var to_array = function(list) {
        var array  = [];
        var length = list.length;

        for (var i = 0; i < length; i++) {
            array.push(list[i]);
        }

        return array;
    }

    var entry_index_ascending = function(a, b) {
        return -1 * (parseInt(a.dataset.index) - parseInt(b.dataset.index));
    }

    var archive       = window.archive = {};
    archive.input     = document.getElementById("archive-search-input");
    archive.list      = document.getElementById("archive-list");
    archive.entries   = to_array(archive.list.querySelectorAll("li"));
    archive.highlight = new Mark(archive.list);

    archive.search  = function(query) {
        var entries = archive.entries;
        var list    = archive.list;

        query = query.toLowerCase().replace(/\s+/g, " ");

        // Sort all entries and reorder them in the list
        var sorted = entries.sort(entry_index_ascending);
        var length = sorted.length;
        var highlight = archive.highlight;
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < length; i++) {
            var entry = sorted[i];
            entry.classList.remove("hidden");
            fragment.appendChild(entry);
        }

        list.appendChild(fragment);
        highlight.unmark();

        // If a query is set
        if (query) {

            var words = query.split(" ");
            var wordsLength = words.length;

            var length = entries.length;
            var matching = [];

            // Save all entries that match and hide the others
            for (var i = 0; i < length; i++) {
                var entry = entries[i];

                var text = entry.textContent.toLowerCase();
                var matches = true;

                for (var j = 0; j < wordsLength; j++) {
                    var word = words[j];
                    if (text.indexOf(word) === -1) {
                        matches = false;
                        break;
                    }
                }

                if (matches) {
                    matching.push(entry);
                }
                else {
                    entry.classList.add("hidden");
                }
            }

            fragment = document.createDocumentFragment();
            length = matching.length;

            // Move all matching entries to the top
            for (var i = 0; i < length; i++) {
                var entry = matching[i];
                fragment.appendChild(entry);
            }

            list.insertBefore(fragment, list.firstElementChild);
            highlight.mark(words);
        }
    }

    archive.input.addEventListener("keyup", function(){
        var query = archive.input.value;
        archive.search(query);
        updateURLQuery({q: query || null});
    });

    // Get the ?q query parameter
    var queryFromURL = getURLQuery("q");

    // If it was passed
    if (queryFromURL) {

        // Trim all whitespace from it
        queryFromURL = queryFromURL.trim();

        // If it's no longer valid, remove ?q parameter from URL.
        if (!queryFromURL) {
            updateURLQuery({q: null});
        }

        // Otherwise, populate the input with this query and search
        else {
            archive.input.value = queryFromURL;
            archive.search(queryFromURL);
        }
    }

}


function setURLQuery(queryData) {
    var queryArray = [];

    var keys = Object.keys(queryData);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = queryData[key];

        if (value) {
            queryArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
        else {
            queryArray.push(encodeURIComponent(key));
        }
    }

    var queryString = queryArray.join("&");

    if (window.history.pushState) {
        var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (queryString) {
            newURL += "?" + queryString;
        }
        if (window.location.hash) {
            newURL += window.location.hash;
        }

        window.history.replaceState(null, "", newURL);
    }
}

function updateURLQuery(queryData) {
    var currentQuery = getURLQuery();

    var keys = Object.keys(queryData);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (queryData[key] === null) {
            delete currentQuery[key];
        }
        else {
            currentQuery[key] = queryData[key];
        }
    }

    setURLQuery(currentQuery);
}

function getURLQuery(findKey) {
    var queryParts = window.location.search.substring(1).split("&");
    var queryData  = {};

    for (var i = 0; i < queryParts.length; i++) {
        var queryPair = queryParts[i].split("=");

        try {
            var key = decodeURIComponent(queryPair[0]);
        }
        catch (e) {
            continue;
        }

        try {
            var value = decodeURIComponent(queryPair[1] || "");
        }
        catch (e) {
            var value = null;
        }

        if (key) queryData[key] = value;
    }

    return findKey ? queryData[findKey] : queryData;
}

})();
