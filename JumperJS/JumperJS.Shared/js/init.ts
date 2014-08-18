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

function resize() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    
    var ratio = window.innerWidth / 768;
    canvas.style.zoom = ratio;
}
