/// <reference path="../typings/createjs/createjs.d.ts" />
/// <reference path="init.ts"/>

var mousetarget = { x: 0, y: 0 };

window.onmousedown = function (evt) {
    mousetarget.x = evt.x;
    mousetarget.y = evt.y;
    
    PlayerSimulateKeyboard();

};

window.onmousemove = function (evt) {
};

window.onmouseup = function (evt) {
    keyboard.left = false;
    keyboard.right = false;
};

function PlayerSimulateKeyboard() {

    if (mousetarget.x > sprite.x) {
        keyboard.left = false;
        keyboard.right = true;
    }

    if (mousetarget.x < sprite.x) {
        keyboard.left = true;
        keyboard.right = false;
    }

    
}