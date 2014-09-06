var soundlib = {};

function sound_init() {
    
    sound_restart();
    soundlib.jump = createjs.Sound.createInstance("jump");
    soundlib.death = createjs.Sound.createInstance("death");
    soundlib.gameover = createjs.Sound.createInstance("gameover");

}

function sound_restart() {

    createjs.Sound.stop();
    //createjs.Sound.play("game", { loop: -1 });

    BgAudio.play("sounds/sparkman.mp3", 73000, playingHandler);

}

function playingHandler() {
    gameReady();
}
