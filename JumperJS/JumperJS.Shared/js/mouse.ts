/// <reference path="../typings/createjs/createjs.d.ts" />
/// <reference path="init.ts"/>

var mouse = {
    update: function () {

        PlayerSimulateKeyboard();
    }
};

var mousetarget = { x: 0, y: 0, active: false };

window.onmousedown = function (evt) {
    mousetarget.x = evt.x / SCREEN_ZOOM;
    mousetarget.y = evt.y / SCREEN_ZOOM;
    mousetarget.active = true;

    PlayerSimulateKeyboard();

};

window.onmousemove = function (evt) {

    if (mousetarget.active === true) {
        mousetarget.x = evt.x / SCREEN_ZOOM;
        mousetarget.y = evt.y / SCREEN_ZOOM;
    }

};

window.onmouseup = function (evt) {
    mousetarget.active = false;
    keyboard.left = false;
    keyboard.right = false;
};

function PlayerSimulateKeyboard() {

    var delta = 50;

    if (!sprite) {
        return;
    }
    
    keyboard.left = false;
    keyboard.right = false;

    if (mousetarget.active === false) {
        keyboard.left = false;
        keyboard.right = false;
        return;
    }

    if (mousetarget.x > sprite.x + delta) {
        keyboard.left = false;
        keyboard.right = true;
    }

    if (mousetarget.x < sprite.x - delta) {
        keyboard.left = true;
        keyboard.right = false;
    }

    
}