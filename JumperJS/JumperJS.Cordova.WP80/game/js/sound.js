
function sound_init() {

    sound_restart();

}

function sound_restart() {

    createjs.Sound.stop();
    createjs.Sound.play("game", { loop: -1 });

}