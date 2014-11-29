function CanvasToTexture(_canvas){
    ctx = _canvas.getContext('2d');
    _w = _canvas.width;
    _h = _canvas.height;
    var imgData=ctx.getImageData(0,0,_w,_h);
    var imgData2 = new Uint8Array( _w * _h * 4 );
    for ( var i = 0; i < _w * _h * 4; i ++ ) { imgData2[i] = imgData.data[i]; }
    var tmp_tex = new THREE.DataTexture( imgData2, _w, _h, THREE.RGBA );
    tmp_tex.needsUpdate = true;
    return tmp_tex;
}

// canvas for a texture (never actually added to DOM ie not visible)
w = 25;
h = 25;
canvas = document.createElement( 'canvas' );
canvas.width = w; canvas.height = h;
ctx = canvas.getContext('2d');

ctx.beginPath();


ctx.strokeStyle = 'rgba(255,255,255,1)';
ctx.lineWidth = w/10;

ctx.arc( w/2, h/2, w/2 - w/10, 0, Math.PI * 2, true );

ctx.stroke();

tex1 = CanvasToTexture(canvas);


w = 64;
h = 64;
canvas = document.createElement( 'canvas' );
canvas.width = w; canvas.height = h;
ctx = canvas.getContext('2d');

ctx.beginPath();

ctx.fillStyle = "rgba(255,255,255,1)";

ctx.arc( w/2, h/2, w/2 - (w/10), 0, Math.PI * 2, true );
ctx.fill();

tex2 = CanvasToTexture(canvas);



