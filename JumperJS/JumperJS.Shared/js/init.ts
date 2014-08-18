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

function resize() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    
    var ratio = window.innerWidth / 768;
    canvas.style.zoom = ratio;

    SCREEN_WIDTH = 768;
    SCREEN_HEIGHT = height / ratio;

    if (window.background) {
        canvas.height = SCREEN_HEIGHT + 4; 
        background.y = -6808 + SCREEN_HEIGHT + 4;
    }

}

