///<reference path="../typings/createjs/createjs.d.ts" />

var camera = {
    y: 0
};

var lastfloor = -1;

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);

var body = document.querySelector("body");

resize();
window.onresize = resize;

var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;

resize();

function resize() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    var oldheight = SCREEN_HEIGHT;
    
    window.outerWidth

    var ratio = window.innerWidth / 768;
    canvas.style.zoom = ratio;

    SCREEN_WIDTH = 768;
    SCREEN_HEIGHT = height / ratio;

    canvas.height = SCREEN_HEIGHT; 

    if (window.background)
    {
        background.y = -6808 + SCREEN_HEIGHT - oldheight + 4;
    }

}
