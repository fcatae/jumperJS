var queue = new createjs.LoadQueue();

queue.on("complete", handleComplete, this);
queue.loadFile({ id: "sound", src: "http://path/to/sound.mp3" });

queue.loadManifest([
    { id: "myImage", src: "path/to/myImage.jpg" }
]);

function handleComplete() {
    createjs.Sound.play("sound");
    var image = queue.getResult("myImage");
}

