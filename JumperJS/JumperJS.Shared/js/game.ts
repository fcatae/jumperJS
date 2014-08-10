///<reference path="../typings/createjs/createjs.d.ts" />

var keyboard = { left: false, right: false};

var screen = {
    y: 0
};


var canvas = document.getElementById("canvas");

var stage = new createjs.Stage(canvas);

var text = new createjs.Text("Megaman", "70px Arial", "#ccc");
text.x = 10;
text.y = 30;
stage.addChild(text);

var floordata = {
    images: ["images/floor.png", "images/floor2.png"],
    frames: [[0, 0, 114, 18, 0], [0, 0, 114, 38, 1]],
    animations: { 
        normal: [0, 0, false, 1],
        bounce: { frames: [1,1,0,1], speed: .5, next: "normal" }
    }
};

var fsheet = new createjs.SpriteSheet(floordata);
//var floor = new createjs.Sprite(fsheet, "normal");
//floor.x = 0;
//floor.y = 700;
//floor.force = { min: 5, mul: .9 };

//floor.regY = -20;
stage.addChild(floor);

var texturedata = {
    "images": ["images/mega.png"],
    "frames": [
        [2, 2, 84, 143],
        [2, 147, 60, 144],
        [2, 292, 71, 144],
        [2, 437, 74, 144],
        [2, 582, 86, 144],
        [2, 728, 81, 144],
        [2, 874, 94, 144]
    ],
    animations: {
        jump: [0, 2, false, .5],
        fall: [3, 4, false, .1],
        stop: [5, 5]
    }
};

var sprite = new createjs.Container();

if (window.showTarget) {
    var target = new createjs.Bitmap("images/target.png");
    target.x = target.y = 0;
    target.scaleX = target.scaleY = .5;
    sprite.addChild(target);
}

var ss = new createjs.SpriteSheet(texturedata);
var spriteImage = new createjs.Sprite(ss, "jump");
spriteImage.scaleX = spriteImage.scaleY = .8;
spriteImage.regX = 70*spriteImage.scaleX/2;
spriteImage.regY = 144*spriteImage.scaleY;
sprite.addChild(spriteImage);

sprite.x = 50;

stage.addChild(sprite);

createjs.Ticker.addEventListener("tick", tick);

sprite.vx = 0;

// queda
sprite.vy = 1;
sprite.ay = 3;
sprite.max_vy = 100;

var currentState = (sprite.vy < 0) ? "jump" : "fall";
spriteImage.gotoAndPlay(currentState);

// floor list
var floorlist = [];
for (var i = 0; i < 10; i++) {

    var floor = new createjs.Sprite(fsheet, "normal");
    floor.x = 300 * Math.random();
    floor.y = 900 - i*90;
    floor.force = { min: 5, mul: .9, max: 50 };

    //floor.regY = -20;
    stage.addChild(floor);
    floorlist.push(floor);
}

function tick(event) {

    // gravidade
    sprite.vy += sprite.ay;

    var delta = sprite.vy;

    if (sprite.vy > sprite.max_vy) {
        delta = sprite.max_vy;
    } else if (sprite.vy < -sprite.max_vy) {
        delta = -sprite.max_vy;
    }
    
    sprite.y += delta;

    for (var i = 0; i < floorlist.length; i++) {

        var floor = floorlist[i];

        var position = sprite.localToLocal(0, 0, floor);

        if (position.y > 0 && (position.y < sprite.max_vy) && (sprite.vy > 0))
        {
            if (position.x > -20 && position.x < 134) {
                sprite.y = floor.y;
                sprite.vy = -floor.force.mul * sprite.vy - floor.force.min;
                floor.gotoAndPlay("bounce");
                break;
            }
        }

    }
    
    //// colision check: jump
    //if (sprite.y > 1000) {
    //    sprite.vy = -0.9* sprite.vy;
    //    sprite.y = 1000;
    //}

    // update the state
    var nextState = (sprite.vy < 0) ? "jump" : "fall";

    // TODO: REMOVE IT LATER
    if (sprite.lasty == sprite.y ) {
        nextState = "stop";
    }
    sprite.lasty = sprite.y;

    if (currentState != nextState) {
        spriteImage.gotoAndPlay(nextState);
        currentState = nextState;
    }

    // handle keyboard
    if (keyboard.left) {
        sprite.vx = 10;
    }
    if (keyboard.right) {
        sprite.vx = -10;
    }
    sprite.x += sprite.vx;

    if (sprite.vx > 0) {
        sprite.vx--;
    }

    if (sprite.vx < 0) {
        sprite.vx++;
    }

    MoveScreenUp();
    Respawn();

    stage.update();
}

function MoveScreenUp() {

    if (sprite.y < 300) {

        var deltaY = 300 - sprite.y;

        deltaY = (deltaY > 30) ? 30 : deltaY;
        
        screen.y += deltaY;

        for (var i = 0; i < floorlist.length; i++) {

            var floor = floorlist[i];

            floor.y += deltaY;
        }

    }

}

function Respawn() {

    for (var i = 0; i < floorlist.length; i++) {

        var floor = floorlist[i];

        if (floor.y > 1000) {
            floor.y -= 1000;
        }
    }
}

window.onkeydown = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 39: //left 
            keyboard.left = true;
            break;

        case 37: //right
            keyboard.right= true;
            break;

    }

}

window.onkeyup = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 39: //left 
            keyboard.left = false;
            break;

        case 37: //right
            keyboard.right = false;
            break;

    }

}