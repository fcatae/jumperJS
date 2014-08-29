var BgAudio = BgAudio || {};

(function () {
    
    var _audio;
    var _duration;
    var _cancelation;

    function _init(src, duration) {
        _duration = duration;
        _audio = new Audio(src);
        _audio.loop = true;
        _audio.onpause = pauseHandler;
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

    function play() {
        if (_audio.currentTime > 0) {
            _audio.currentTime = 0;
        }
        _audio.play();
        setupLooping();
    };

    function stop() {
        _audio.currentTime = 0;
        _audio.pause();
    }

    BgAudio.play = function (src, duration) {
        if (src) {
            _init(src, duration);
        }
        play();
    }

    BgAudio.stop = stop;

})();

window.BgAudio = BgAudio;

// Example: BgAudio.play("sounds/sparkman.mp3", 73000);
