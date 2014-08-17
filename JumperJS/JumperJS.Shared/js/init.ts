///<reference path="../typings/createjs/createjs.d.ts" />

var camera = {
    y: 0
};

var lastfloor = -1;

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);

var body = document.querySelector("body");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

window.onresize = function () {

    //body.style.zoom = window.innerWidth / 400;

};
