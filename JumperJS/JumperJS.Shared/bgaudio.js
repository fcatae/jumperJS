var BgAudio = BgAudio || {};

(function () {
    
    var _audio;
    var _duration;
    var _cancelation;

    function _init(src, duration, playingHandler) {
        _duration = duration;

        if (_audio == null) {
            _audio = new Audio(src);
            _audio.loop = true;
            _audio.onpause = pauseHandler;
            _audio.onplaying = playingHandler;
            //_audio.oncanplay = canplayHandler;

            _audio.addEventListener("playing", canplayHandler);
            document.body.appendChild(_audio);
        }
    };
    
    function setCancelationTimeout(value) {
        if (_cancelation && _cancelation != null) {
            clearTimeout(_cancelation);
        }

        _cancelation = value;
    }

    function pauseHandler() {
        setCancelationTimeout(null);
    }

    function setupLooping() {
        var duration = _duration;

        if (duration && (!isNaN(duration))) {
            var cancel = setTimeout(loop, duration);

            setCancelationTimeout(cancel);
        }
    }

    function loop() {
        if (!_audio.paused) {
            _audio.currentTime = 0;
            _audio.play();
        }

        setupLooping();
    }

    function canplayHandler() {
        BgAudio.isReady = true;

        if (onReadyStateChange != null) {
            onReadyStateChange();
            try {
                
            } catch (e) {
            }
            onReadyStateChange = null;
        }
    }

    function play() {
        if (_audio.currentTime > 0) {
            _audio.currentTime = 0;
        }
        _audio.play();
        setupLooping();
    };

    function stop() {
        BgAudio.isReady = false;
        _audio.currentTime = 0;
        _audio.pause();
    }

    BgAudio.play = function (src, duration, playingHandler) {
        if (src) {
            _init(src, duration, playingHandler);
        }
        play();
    }

    BgAudio.pause = function() {
        try {
            BgAudio.isReady = false;
            _audio.pause();
        } catch (e) {
        }
    }

    var timeout = 0;

    BgAudio.unpause = function () {
        try {
            _audio.play();
            timeout = 0;
        } catch (e) {
            // assume it is working
            if (timeout > 1000) { BgAudio.isReady = true; }

            setTimeout(BgAudio.unpause, 250);
            timeout += 250;
        }
        
    }

    BgAudio.stop = stop;

    var onReadyStateChange = null;

    BgAudio.isReady = false;

    BgAudio.playAsync = function (src, duration, playingHandler) {

        return new WinJS.Promise(function (c) {

            onReadyStateChange = c;

            BgAudio.play(src, duration, playingHandler);

            if (BgAudio.isReady == true) {
                canplayHandler();
            }
        });
    };
    
    BgAudio.unpauseAsync = function () {

        BgAudio.unpause();

        return new WinJS.Promise(function (c) {

            onReadyStateChange = c;

            if (BgAudio.isReady == true) { 
                canplayHandler();
            }

        });
    };

})();

window.BgAudio = BgAudio;

// Example: BgAudio.play("sounds/sparkman.mp3", 73000);
