///<reference path="../typings/createjs/createjs.d.ts" />
///<reference path="init.ts"/>



//var texturedata = {
//    "images": ["images/mega.png"],
//    "frames": [
//        [2, 2, 84, 143],
//        [2, 147, 60, 144],
//        [2, 292, 71, 144],
//        [2, 437, 74, 144],
//        [2, 582, 86, 144],
//        [2, 728, 81, 144],
//        [2, 874, 94, 144]
//    ],
//    animations: {
//        jump: [0, 2, false, .5],
//        fall: [3, 4, false, .1],
//        stop: [5, 5]
//    }
//};

//var sprite = new createjs.Container();

//window.showTarget = true;
//if (window.showTarget) {
//    var target = new createjs.Bitmap("images/target.png");
//    target.x = target.y = 0;
//    target.scaleX = target.scaleY = .5;
//    sprite.addChild(target);
//}

//var ss = new createjs.SpriteSheet(texturedata);
//var spriteImage = new createjs.Sprite(ss, "jump");
//spriteImage.scaleX = spriteImage.scaleY = .8;
//spriteImage.regX = 70 * spriteImage.scaleX / 2;
//spriteImage.regY = 144 * spriteImage.scaleY;
//sprite.addChild(spriteImage);

//sprite.x = 50;

//stage.addChild(sprite);


//sprite.vx = 0;

//// queda
//sprite.vy = 1;
//sprite.ay = 3;
//sprite.max_vy = 50;

//var currentState = (sprite.vy < 0) ? "jump" : "fall";
//spriteImage.gotoAndPlay(currentState);



createjs.Ticker.addEventListener("tick", tick);




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
                
                if (i === lastfloor) {
                    sprite.vy = -floor.force.mul * sprite.vy;
                } else {
                    sprite.vy = -floor.force.min;
                }
                lastfloor = i;

                floor.gotoAndPlay("bounce");
                createjs.Sound.play("jump");

                break;
            }
        }

    }

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
    
    if (sprite.y < 300 && sprite.vy < 0) {

        var deltaY = 300 - sprite.y;

        background.y += deltaY /  100;

        deltaY = (deltaY > 30) ? 30 : deltaY;
        
        screen.y += deltaY;

        for (var i = 0; i < floorlist.length; i++) {

            var floor = floorlist[i];

            floor.y += deltaY;
        }

    }

    // finish the game
    if (background.y > 0) {
        background.y = 0;
    }
}

function Respawn() {

    for (var i = 0; i < floorlist.length; i++) {

        var floor = floorlist[i];

        if (floor.y > floorlist_respawn_distance) {
            floor.x = 500 * Math.random();
            floor.y -= floorlist_respawn_distance;
        }
    }
}
