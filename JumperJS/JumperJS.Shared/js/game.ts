///<reference path="../typings/createjs/createjs.d.ts" />

var canvas = document.getElementById("canvas");

var stage = new createjs.Stage(canvas);

var text = new createjs.Text("Hello world", "70px Arial", "#ccc");
text.x = 10;
text.y = 30;
stage.addChild(text);

// Show sprite sheet
//var bitmap = new createjs.Bitmap("images/megaman.png");
//bitmap.x = 0;
//bitmap.y = 100;
//stage.addChild(bitmap);


var texturedata = {
    "images": ["images/mega.png"],
    "frames": [
        [2, 2, 84, 143],
        [2, 147, 60, 143],
        [2, 292, 71, 143],
        [2, 437, 74, 143],
        [2, 582, 86, 144],
        [2, 728, 81, 144],
        [2, 874, 94, 143]
    ],
    animations: {
        jump: [0, 2, false, .5],
        fall: [3, 4, false, .1]
    }
};

//var data = {
//    images: ["images/megaman.png"],
//    // width, height & registration point of each sprite
//    frames: { width: 80, height: 144 },
//    animations: {
//        jump: [0, 6, false, .5]        
//    }
//};

var ss = new createjs.SpriteSheet(texturedata);
var sprite = new createjs.Sprite(ss, "jump");
sprite.scaleX = sprite.scaleY = .8;

stage.addChild(sprite);

createjs.Ticker.addEventListener("tick", tick);

// queda
sprite.vy = 1;
sprite.ay = 3;
sprite.max_vy = 200;

var currentState = (sprite.vy < 0) ? "jump" : "fall";
sprite.gotoAndPlay(currentState);
sprite.paused = true;

function tick(event) {

    // gravidade
    sprite.vy += sprite.ay;
    if (sprite.vy > sprite.max_vy) {
        sprite.vy = sprite.max_vy;
    }
    
    sprite.y += sprite.vy;

    // jump
    if (sprite.y > 600) {
        sprite.vy = -50;
        sprite.y = 600;
    }

    var nextState = (sprite.vy < 0) ? "jump" : "fall";

    if (currentState != nextState) {
        sprite.gotoAndPlay(nextState);
        currentState = nextState;
    }
    
    stage.update();
}


