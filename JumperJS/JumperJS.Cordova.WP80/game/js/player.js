﻿
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

var player_isActive = true;
var sprite = new createjs.Container();
var currentState;
var ss;
var spriteImage;



function player_init() {

if (window.showTarget) {
    var target = new createjs.Bitmap("images/target.png");
    target.x = target.y = 0;
    target.scaleX = target.scaleY = .5;
    sprite.addChild(target);
}

ss = new createjs.SpriteSheet(texturedata);
spriteImage = new createjs.Sprite(ss, "jump");
spriteImage.scaleX = spriteImage.scaleY = .8;
spriteImage.regX = 70*spriteImage.scaleX/2;
spriteImage.regY = 144*spriteImage.scaleY;
sprite.addChild(spriteImage);

stage.addChild(sprite);

//sprite.x = 50;
//sprite.vx = 0;

//// queda
//sprite.vy = 1;
//sprite.ay = 3;
//sprite.max_vy = 50;

//currentState = (sprite.vy < 0) ? "jump" : "fall";
//spriteImage.gotoAndPlay(currentState);

player_restart();
}

function player_restart() {
    sprite.x = 50;
    sprite.y = 0;
    sprite.vx = 0;

    // queda
    sprite.vy = 1;
    sprite.ay = 3;
    sprite.max_vy = 50;

    currentState = (sprite.vy < 0) ? "jump" : "fall";
    spriteImage.gotoAndPlay(currentState);
}