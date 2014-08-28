///<reference path="../typings/createjs/createjs.d.ts" />

var camera = {
    y: 0
};

var lastfloor = -1;

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);

var body = document.querySelector("body");

window.onresize = resize;

var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;
var SCREEN_ZOOM = 1;
var positiontop = -6808 + 4;

resize();

function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    //if ((width / height) > 3.0 / 4.0) {
    //    width = 3 * height / 4;
    //}

    var ratio = width / 768;

    canvas.style.zoom = ratio;
    
    SCREEN_WIDTH = 768;
    SCREEN_HEIGHT = height / ratio;
    SCREEN_ZOOM = ratio;

    canvas.height = SCREEN_HEIGHT; 

    if (window.background)
    {
        background.y = positiontop + SCREEN_HEIGHT;
    }

}


window.onload = function () {
    init_init();
}

function init_init() {
    background_init();

    sound_init();

    player_init();
    game_init();
}


