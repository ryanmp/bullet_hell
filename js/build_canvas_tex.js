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

e_bullet_tex = [];
max_size = 6;
for (var i = 1; i < max_size; i++){
	w = 20*i;
	h = 20*i;
	canvas = document.createElement( 'canvas' );
	canvas.width = w; canvas.height = h;
	ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(255,255,255,1)';
	ctx.lineWidth = 8;
	ctx.shadowBlur=20;
	ctx.shadowColor="black";
	ctx.arc( w/2, h/2, w/2 - 8, 0, Math.PI * 2, true );
	ctx.stroke();

	//var grd=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);
	//grd.addColorStop(0,"rgba(255,255,255,0)");
	//grd.addColorStop(.9-(1-(i/max_size)),"rgba(255,255,255,0)");
	//grd.addColorStop(w,"rgba(255,255,255,1)");
	//ctx.fillStyle=grd;
	//ctx.fill();
	e_bullet_tex.push( CanvasToTexture(canvas) );
}


e_body_tex = [];
max_size = 4;
for (var i = 3; i < max_size+3; i++){
	w = 30*i;
	h = 30*i;
	canvas = document.createElement( 'canvas' );
	canvas.width = w; canvas.height = h;
	ctx = canvas.getContext('2d');
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.arc( w/2, h/2, w/2 - 3, 0, Math.PI * 2, true );

	ctx.shadowBlur=3;
	ctx.shadowColor="black";

	ctx.fill();

	e_body_tex.push( CanvasToTexture(canvas) );
}



w = 30;
h = 30;
canvas = document.createElement( 'canvas' );
canvas.width = w; canvas.height = h;
ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.arc( w/2, h/2, w/2 - 3, 0, Math.PI * 2, true );

ctx.shadowBlur=3;
ctx.shadowColor="black";

ctx.fill();

p_body_tex = CanvasToTexture(canvas)







