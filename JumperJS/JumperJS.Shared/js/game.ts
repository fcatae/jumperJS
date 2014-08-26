///<reference path="../typings/createjs/createjs.d.ts" />
///<reference path="init.ts"/>

function game_init() {
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {

    mouse.update();

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
    if (keyboard.right) {
        sprite.vx = 10;
    }
    if (keyboard.left) {
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
