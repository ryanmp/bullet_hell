function r(min, max) {
    "use strict";
    return Math.random() * (max - min) + min;
}

function ri(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.requestAnimFrame = (function () {
    "use strict";
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
    };
}());