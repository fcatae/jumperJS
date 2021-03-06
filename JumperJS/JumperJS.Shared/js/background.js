﻿var background = new createjs.Bitmap("images/bg.png");

// Floor data
var floordata = {
    images: ["images/floor.png", "images/floor2.png"],
    frames: [[0, 0, 114, 18, 0], [0, 0, 114, 38, 1]],
    animations: {
        normal: [0, 0, false, 1],
        bounce: { frames: [1, 1, 0, 1], speed: .5, next: "normal" }
    }
};

var floorlist = new Array(12);
var fsheet = new createjs.SpriteSheet(floordata);

// floor list
var floorlist_distance = 200;
var floorlist_respawn_distance = floorlist.length * floorlist_distance;

function background_init() {

    stage.addChild(background);
    //stage.addChild(floor);

    background_restart();

    //background.y = -6808 + SCREEN_HEIGHT + 4;
    //for (var i = 0; i < floorlist.length; i++) {

    //    var floor = new createjs.Sprite(fsheet, "normal");
    //    floor.x = 500 * Math.random();
    //    floor.y = SCREEN_HEIGHT - floorlist_distance - i * floorlist_distance;
    //    floor.force = { min: 30, mul: 1.1, max: 50 };
    //    floor.force = { min: 50, mul: 1.1, max: 50 };

    //    //floor.regY = -20;
    //    stage.addChild(floor);
    //    floorlist[i] = floor;
    //}

    //for (var i = 0; i < floorlist.length - 1; i++) {
    //    floorlist[i].x += 70;
    //}

    //floorlist[0].x = 20;
}

function background_restart() {
    background.y = -6808 + SCREEN_HEIGHT + 4;

    for (var i = 0; i < floorlist.length; i++) {

        var floor = floorlist[i];

        if (floor == null) {
            floor = new createjs.Sprite(fsheet, "normal");
            stage.addChild(floor);

            floorlist[i] = floor;
        }

        floor.x = 500 * Math.random();
        floor.y = SCREEN_HEIGHT - floorlist_distance - i * floorlist_distance;
        floor.force = { min: 50, mul: 1.1, max: 50 };

    }

    for (var i = 0; i < floorlist.length - 1; i++) {
        floorlist[i].x += 70;
    }

    floorlist[0].x = 20;
}