// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            var p = WinJS.UI.processAll();
            var i = preload_getPromise();

            args.setPromise(i);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
        appleave();
    };

    function appleave() {

        if (document.visibilityState == 'hidden') {
            if (!game_paused) {
                var restartgame = document.getElementById("restartgame");
                restartgame.className = "paused";
                BgAudio.pause();
                createjs.Sound.stop();
                game_stop();

                game_paused = true;

                if (isGameOver) {
                    restartGame();
                }
                else {
                    unpauseGame();
                }
            }   


        }
    }

    document.addEventListener("msvisibilitychange", function msvisibility() { appleave(); });

    //Windows.UI.WebUI.WebUIApplication.onresuming = function resuming () {
    //    appleave();
    //}

    WinJS.Application.addEventListener("error", function (err) {

        try {
            // assume we have an audio playback exception            
            //errorpane.textContent = "Exception2 " + err.detail.errorMessage;
        }
        catch (e) { }

        return true;
    });


    app.onbackclick = function () {

        if (!game_paused) {
            var restartgame = document.getElementById("restartgame");
            restartgame.className = "paused";
            BgAudio.pause();
            createjs.Sound.stop();
            game_stop();

            game_paused = true;

            if (isGameOver) {
                restartGame();
            }
            else
            {
                unpauseGame();
            }

            return true;
        }

        return false;
    };

    app.start();
})();