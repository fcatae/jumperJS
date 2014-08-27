var manifest = [
    // Images
        //{ id: "floor", src: "images/floor.png" },
        //{ id: "floor2", src: "images/floor2.png" },
        //{ id: "bg", src: "images/bg.png" },
        //{ id: "mega", src: "images/mega.png" },
        //{ id: "target", src: "images/target.png" },

    // Sounds
        { id: "jump", src: "sounds/jump.mp3" },
        { id: "death", src: "sounds/death.mp3" },
//        { id: "intro", src: "sounds/intro.mp3" },
        { id: "game", src: "sounds/sparkman.mp3" },
        { id: "gameover", src: "sounds/gameover.mp3" }
    ];

var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);

queue.on("complete", handleComplete, this);

queue.loadManifest(manifest);

function handleComplete() {
    init_init();
    sound_init();
}