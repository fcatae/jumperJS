var keyboard = { left: false, right: false };

window.onkeydown = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 39: //left 
            keyboard.left = true;
            break;

        case 37: //right
            keyboard.right = true;
            break;

    }

}

window.onkeyup = function (evt) {

    var code = evt.keyCode;

    switch (code) {
        case 39: //left 
            keyboard.left = false;
            break;

        case 37: //right
            keyboard.right = false;
            break;

    }

}