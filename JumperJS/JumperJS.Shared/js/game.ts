///<reference path="../typings/createjs/createjs.d.ts" />
///<reference path="init.ts"/>

function game_init() {
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {

    if (player_isActive) {
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

            if (position.y > 0 && (position.y < sprite.max_vy) && (sprite.vy > 0)) {
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
        //if (sprite.lasty == sprite.y) {
        //    nextState = "stop";
        //}
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
        CheckPlayerIsAlive();

    }

    stage.update();

}

var line = null;

function CheckPlayerIsAlive() {

    var LOD = SCREEN_HEIGHT + 160;// - 600;

    //if (line == null) {
    //    line = (new createjs.Graphics()).beginStroke("red").setStrokeStyle(3).moveTo(0, LOD - 160).lineTo(768, LOD - 160);
    //    stage.addChild(new createjs.Shape(line));
    //}

    if (sprite.y > LOD) {
        GameOver();
    }
}

var isGameOver = false;
function GameOver() {
    if (!isGameOver) {
        isGameOver = true;
        player_isActive = false;

        createjs.Sound.stop();
        createjs.Sound.play("death");
        createjs.Sound.play("gameover", null, 500);

        Particles();

        createjs.Tween.get(stage).wait(2000).call(restartGame);        

    }
}

var particles = new Array(5);

function Particles() {

    for (var i = 0; i < particles.length; i++) {

        var partic = particles[i];

        if (partic == null) {
            partic = new createjs.Bitmap("images/spark.png");
            particles[i] = partic;
        }

        partic.x = sprite.x;
        partic.y = sprite.y;
        partic.alpha = 1;
        partic.scaleX = 1;
        partic.scaleY = 1;
        partic.visible = true;
        partic.y = SCREEN_HEIGHT;

        stage.addChild(partic);

        var newa = 3.1415 * (45 - 90 * (i + .5)/particles.length) / 180;
        var newm = 300;
        var newx = partic.x + newm * Math.sin(newa);
        var newy = partic.y - newm * Math.cos(newa);

        createjs.Tween.get(partic).to({ x: newx, y: newy, alpha: 0, scaleX: .8, scaleY: .8 }, 2000).to({ visible: false });
    }
}


function restartGame() {

    mouse_restart();
    keyboard_restart();
    background_restart();
    player_restart();
    sound_restart();

    isGameOver = false;
    player_isActive = true;

}

function MoveScreenUp() {
    
    if (sprite.y < 300 && sprite.vy < 0) {

        var deltaY = 300 - sprite.y;
        var speedY = deltaY / 100;
        background.y += speedY;
        positiontop += speedY;

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
