var keyboard = { left: false, right: false };

function keyboard_restart() {
    keyboard.left = false;
    keyboard.right = false;
}

window.onkeydown = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 37: //left 
            keyboard.left = true;
            break;

        case 39: //right
            keyboard.right = true;
            break;

    }

}

window.onkeyup = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 37: //left 
            keyboard.left = false;
            break;

        case 39: //right
            keyboard.right = false;
            break;

    }

}