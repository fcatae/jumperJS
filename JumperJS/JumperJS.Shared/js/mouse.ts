/// <reference path="../typings/createjs/createjs.d.ts" />
/// <reference path="init.ts"/>

var mousetarget = new createjs.Bitmap("images/target.png");
stage.addChild(mousetarget);

window.onmousedown = function (evt) {
    mousetarget.x = evt.x;
    mousetarget.y = evt.y;

    mousetarget.regX = mousetarget.getBounds().width / 2;
    mousetarget.regY = mousetarget.getBounds().height / 2;

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