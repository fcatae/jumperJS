/* 
 * Unexpected exceptions coming from Audio.Play()
 * 
 * PROBLEM: 
 *
 * CAUSE:
 *
 * WORKAROUND:
 *
 */

(function () {

    var _proxyCreateTag = null;

    function installHotfix() {

        if (createjs && createjs.HTMLAudioPlugin && (_proxyCreateTag == null)) {
            // patch _createTag function
            var p = createjs.HTMLAudioPlugin.prototype;

            // only if it hasn't been patched
            if (p._createTag != hotfixReadyState) {
                _proxyCreateTag = p._createTag;
                p._createTag = hotfixReadyState;
            }
        }

    }

    function hotfixReadyState(src) {
        var tag = _proxyCreateTag(src);
        var funcPlay = tag.play.bind(tag);

        tag.play = function () {
            try { funcPlay(); } catch (e) {
                // most likely access denied
            }
        };

        return tag;
    }

    installHotfix();

})();