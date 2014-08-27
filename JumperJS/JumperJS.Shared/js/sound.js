
var audiomanifest = [
    { id: "jump", src: "jump.wav" },
    { id: "intro", src: "intro.mp3" },
    { id: "game", src: "sparkman.mp3" },
    { id: "gameover", src: "gameover.mp3" },

];

// HACK
// break on the phone
createjs.Sound.EXTENSION_MAP["wav"] = "mp3";

createjs.Sound.initializeDefaultPlugins();

createjs.Sound.addEventListener("fileload", function (evt) {
    var a = evt.src;
    var b = 1;
});

createjs.Sound.registerManifest(audiomanifest, "sounds/");

//createjs.Sound.play("game", { loop: -1 });
