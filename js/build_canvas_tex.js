function CanvasToTexture(canvas){
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var imgData = ctx.getImageData(0,0,w,h);
    var imgData2 = new Uint8Array( w * h * 4 );
    for ( var i = 0; i < w * h * 4; i ++ ) { imgData2[i] = imgData.data[i]; }
    var tmp_tex = new THREE.DataTexture( imgData2, w, h, THREE.RGBA );
    tmp_tex.needsUpdate = true;
    return tmp_tex;
}

function TextureToBasicMaterial(texture){
    return new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, 1, 1 ), map:texture, transparent: true }); 
}

function NewRandomMaterial(size){

	var w = size; var h = size;
	var canvas = document.createElement( 'canvas' );
	canvas.width = w; canvas.height = h;
	var ctx = canvas.getContext('2d');
	
	ctx.beginPath();
	//ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillStyle = "rgba(255,255,255,0)";
	ctx.arc( w/2, h/2, w/2 - 3, 0, Math.PI * 2, true );
	ctx.shadowBlur=10;
	ctx.shadowColor="black";
	ctx.fill();
	

	large_int = ri(1007199254740992,9007199254740992);
    make_identicon(large_int, w/2, h/2, ctx);

	ctx.shadowBlur=1;
	ctx.shadowColor='rgba(255,0,0,.5)';
	ctx.strokeStyle = 'rgba(255,0,0,1)';
	ctx.lineWidth = w/25;

	ctx.beginPath();
	ctx.arc( w/2, h/2, w/2.1, 0, Math.PI * 2, true );
	ctx.stroke();

	ctx.strokeStyle = 'rgba(255,0,0,.8)';

	ctx.beginPath();
	ctx.arc( w/2, h/2, w/2.4, 0, Math.PI * 2, true );
	ctx.stroke();

	ctx.strokeStyle = 'rgba(255,0,0,.6)';

	ctx.beginPath();
	ctx.arc( w/2, h/2, w/2.8, 0, Math.PI * 2, true );
	ctx.stroke();

	ctx.strokeStyle = 'rgba(255,0,0,.4)';

	ctx.beginPath();
	ctx.arc( w/2, h/2, w/3.35, 0, Math.PI * 2, true );
	ctx.stroke();

	var temp_tex = CanvasToTexture(canvas);
    return TextureToBasicMaterial(temp_tex);
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



w = 60;
h = 60;
canvas = document.createElement( 'canvas' );
canvas.width = w; canvas.height = h;
var ctx = canvas.getContext('2d');



/*
ctx.beginPath();
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.arc( w/2, h/2, w/2 - 3, 0, Math.PI * 2, true );
ctx.shadowBlur=0;
ctx.shadowColor="black";
ctx.fill();
*/

	

ctx.shadowBlur = 10;
ctx.shadowColor = "rgba(0,0,0,1)";
ctx.lineWidth = 5;

ctx.strokeStyle = 'rgba(0,255,255,1)';
ctx.beginPath();
ctx.arc( w/2, h/2, (w/2) - 4, 0, Math.PI * 2, true);
ctx.stroke();

ctx.shadowBlur = 10;
ctx.shadowColor = "rgba(0dw,255,255,1)";

ctx.strokeStyle = 'rgba(0,255,255,.6)';
ctx.beginPath();
ctx.arc( w/2, h/2, (w/2.5) - 4, 0, Math.PI * 2, true );
ctx.stroke();

ctx.strokeStyle = 'rgba(0,255,255,.4)';
ctx.beginPath();
ctx.arc( w/2, h/2, (w/3.3) - 4, 0, Math.PI * 2, true );
ctx.stroke();

ctx.fillStyle = 'rgba(0,255,255,.2)';

ctx.beginPath();
ctx.arc( w/2, h/2, w/5.5, 0, Math.PI * 2, true );
ctx.fill();

p_body_tex = CanvasToTexture(canvas);
p_body_mat = TextureToBasicMaterial(p_body_tex);
















function make_identicon(hash, w, h, ctx){
    
    //break hash into useful components;
    hash2 = hash%255;
    hash3 = Math.round((hash/255)%255);
    hash4 = Math.round((hash/255*255)%255);
    hash5 = Math.round((hash/255*255*255)%255);
    hash6 = Math.round((hash/255*255*255*255)%255);
    hash7 = Math.round((hash/255*255*255*255*255)%255);
    var color1 = 'rgba('+hash2+','+hash3+',50,.5)';
    var color2 = 'rgba('+hash4+','+hash5+',100,.5)';
    var color3 = 'rgba('+hash6+','+hash7+',155,.5)';
    
    //ctx.fillStyle='rgba('+0+','+0+',0,0)';
    //ctx.rect(0,0,w,h);
    //ctx.fill();
    
    ctx.translate(w,h);
    
    var points = new Array();
    for (var i=0;i<4; i++){
        points[i] = new Array();
        t = [0,0]
        for (var j=0;j<5; j++){
            points[i][j] = new Array();
            t = [t[0]+r(-w/4,w/4),t[1]+ri(-w/4,w/4)];
            //points[i][j] = [getR(0,w/2),getR(0,w/2)];  
            points[i][j] = [t[0],t[1]]; 
        }
    }
    
    hash8 = Math.round((hash/255*255*255*255*255*255)%5);
    rotations = hash8+2;
    for (var i=0;i<rotations; i++){
        ctx.rotate(3.1415/rotations*2);
        draw_shape(color1, 0);
    }
    for (var i=0;i<rotations; i++){
        ctx.rotate(3.1415/rotations*2);
        draw_shape(color2, 1);
    }
    for (var i=0;i<rotations; i++){
        ctx.rotate(3.1415/rotations*2);
        draw_shape(color3, 2);  
    }
    
    function draw_shape(color,idx){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (var i = 0; i < points[idx].length;i++){
            ctx.lineTo(points[idx][i][0],points[idx][i][1]);
        }
        ctx.closePath();
        ctx.shadowBlur=5;
        ctx.shadowColor=color;
        ctx.fill();
    }

    ctx.translate(-w,-h);

}


