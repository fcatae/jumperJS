/* 
 * Hotfix for soundJS and Windows Phone 8.0
 * 
 * PROBLEM: soundJS does not work on Windows Phone 8.0
 *
 * CAUSE:
 * For unknown reason Internet Explorer running in Windows Phone 8.0 does not
 * update the "readyState" for the HTML Audio element. It does not call the
 * readystatechange event either. 
 *
 * WORKAROUND:
 * Manually update the "readyState" based on the "canplay" event. It is not
 * fully equivalent, but it works.
 *
 */

(function () {

    var _proxyCreateTag = null;

    function installHotfix() {

        if (createjs && createjs.HTMLAudioPlugin && (_proxyCreateTag == null)) {
            // patch _createTag function
            var p = createjs.HTMLAudioPlugin.prototype;
            _proxyCreateTag = p._createTag;
            p._createTag = hotfixReadyState;
        }

    }

    function hotfixReadyState(src) {
        var tag = _proxyCreateTag(src);

        // attach to canplay Event: change the readyState
        tag.addEventListener("canplay", function () {
            Object.defineProperty(tag, "readyState", { value: 4 });
        });

        return tag;
    }

    function isWindowsPhone80() {
        var useragent = navigator.userAgent;
        var checkWP80 = /Windows Phone 8.0/i.test(useragent.toLowerCase());
        var checkIE10 = /MSIE 10.0/i.test(useragent.toLowerCase());

        return (checkWP80 && checkIE10);
    }

    // Install hotfix only if it detects Windows Phone 8.0
    if (isWindowsPhone80()) {
        installHotfix();
    }
})();