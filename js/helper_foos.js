function r(min, max) {
    return Math.random() * (max - min) + min;
}

function ri(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.requestAnimFrame = (function () {
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (  callback,  element) {
	window.setTimeout(callback, 1000 / 60);
};
})();