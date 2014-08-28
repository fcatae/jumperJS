
function sound_init() {

    sound_restart();

}

function sound_restart() {

    createjs.Sound.stop();
    var inst = createjs.Sound.play("game", { loop: -1 });
    //inst.pause();
    //inst.play();

}

