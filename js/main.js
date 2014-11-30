/*

GLOBAL VARIABLES

*/


// for three.js
var container, scene, camera, renderer, spheres, s, player; //s == rot speed


// build materials

var e_body_mat = [];
var i = 0;
for (i = 0; i < e_body_tex.length; i++){
	e_body_mat.push(   new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, .1, .1 ), map: e_body_tex[i], transparent: true })   );
}

var e_bullet_mat = [];
for (i = 0; i < e_bullet_tex.length; i++){
	e_bullet_mat.push(   new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, .6, 0 ), map: e_bullet_tex[i], transparent: true })   );
}

var p_bullet_mat = new THREE.MeshBasicMaterial({ color: new THREE.Color( 0, .9, .1 ), map: e_bullet_tex[1], transparent: true })  
 
var	scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(5, w / h, 1, 9500);

var	p; // making it global, since enemies need the location

var w; var h; // window-viewport dimensions

var paused = false;


// more
var frame = 0;
var scene_objects = [];
var stats = new Stats();

var max_v = .4;
var max_v2 = .4*.66;
var active_keys = [];
for (var i = 0; i < 100; i++) active_keys[i] = 0;

// entry point after window has loaded
$(window).load(function(){
	init();
	build_game_elements();
	animate(); // last step... start game loop
});


function init() {

	w = window.innerWidth;
	h = window.innerHeight;

	camera = new THREE.PerspectiveCamera(5, w / h, 1, 9500);

	//for keyboard input
	document.addEventListener('keydown', function(event) {
	    active_keys[event.keyCode] = 1;
	});
	document.addEventListener('keyup', function(event) {
	    active_keys[event.keyCode] = 0;
	});

	stats.setMode(0); // 0: fps, 1: ms
	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	var canvas = document.createElement('canvas');
	canvas.id = "canvas";
	canvas.width = w;
	canvas.height = h;
	canvas.style.opacity = '1';

	//three.js init...
	var container = document.createElement('container');
	container.id = "container";
	container.width = w;
	container.height = h;
	document.body.appendChild(container);

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(w, h);
	container.appendChild( renderer.domElement );

	camera.position.z = 550;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.rotation.z = Math.PI;
    
    /*
      // add subtle blue ambient lighting
      var ambientLight = new THREE.AmbientLight(0x222233);
      scene.add(ambientLight);
      
      // sun center light source
      var directionalLight1 = new THREE.PointLight(0xaa9966);
      directionalLight1.position.set(0, 0, 100);
      directionalLight1.intensity = 2.1;
      scene.add(directionalLight1);


      // just illuminates sun via spot light
      var directionalLight2 = new THREE.SpotLight(0xff8800);
      directionalLight2.position.set(0, 0, 1500);
      directionalLight2.angle = 3.14/50;
      directionalLight2.intensity = 1.5;
      scene.add(directionalLight2);

      // directional lighting (for added detail)
      var directionalLight3 = new THREE.PointLight(0x777777);
      directionalLight3.position.set(0, 0, 100);
      directionalLight3.intensity = .4;
      scene.add(directionalLight3);
      */
}


function build_game_elements(){

	p = new player();

	// create 10 enemies with random positions,velocities, num_bullets
	var e = [];
	for (var i = 0; i < 10; i++){

		var start_v = {x:r(-.1,.1),y:r(-.1,.1)};
		var bullet_v = {x:r(-1,1)*.3,y:r(-1,1)*.3};

		var body_size = ri(3,7);

		var enemy_type = ri(1,4);
        var bullet_size = ri(2,3);
        
		e[i] = new enemy(body_size,bullet_size,ri(3,15),bullet_v,ri(150,200),{x:r(.05*w,-.05*w),y:r(.05*h,-.05*h)}, start_v, enemy_type, ri(1,2));
	}

	add_scene_objects();
    
    
  /*
w = 128;
h = 128;
canvas = document.createElement( 'canvas' );
canvas.width = w; canvas.height = h;
ctx = canvas.getContext('2d');
w2 = w/5;
w3 = w/30;
    
ctx.clearRect(0,0,w,h);
    
	ctx.strokeStyle = "rgba(50,50,50,1)";
	ctx.lineWidth = 5;
    
	ctx.beginPath();
      ctx.moveTo(w/2, 0);
      ctx.lineTo(w/2, h);
      ctx.stroke();
    
    ctx.beginPath();
      ctx.moveTo(0, h/2);
      ctx.lineTo(w, h/2);
      ctx.stroke();
tex2 = CanvasToTexture(canvas);

tex2.wrapS = tex2.wrapT = THREE.RepeatWrapping;
tex2.repeat.set( 128*4, 128*4 );

var size1 = 128*8;
obj3 = [];
k = 0;
	
var mat3 = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, map: tex2});
var plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), mat3 );
scene.add(plane);
*/
    
    /*
    planets = [];
    AddPlanet(20,{x:0,y:0,z:0},{r:.9,g:.2,b:0},{x:0,y:.002,z:.001},0,2,planets);
    function AddPlanet(_r,_p,_c,_rot,_orbit,_detail,_planets){
        var l = _planets.length;

        var _color = new THREE.Color();
        _color.setRGB(_c.r, _c.g, _c.b);

        planets.push({
            mesh: new THREE.Mesh(new THREE.IcosahedronGeometry( _r, _detail ), new THREE.MeshLambertMaterial({shading: THREE.FlatShading, color: _color})),
            rot:_rot,
            orbit:_orbit});
        planets[l].mesh.position = new THREE.Vector3(_p.x, _p.y, _p.z);
         planets[l].mesh.position.x = 50;
        
      scene.add(planets[l].mesh);
    } */
   
}




function add_scene_objects(){
	// add all objects from scene
	for (var i = 0; i < scene_objects.length; i++){
		for (var j = 0; j < scene_objects[i].e.bullets.length; j++){
			scene.add(scene_objects[i].e.bullets[j].b);
		}
		scene.add(scene_objects[i].e.body.b);
	}
}

function remove_scene_objects(){
	for (var i = 0; i < scene_objects.length; i++){
		for (var j = 0; j < scene_objects[i].e.bullets.length; j++){
			scene.remove(scene_objects[i].e.bullets[j].b);
		}
		scene.remove(scene_objects[i].e.body.b);
	}
}


function animate() {
	stats.begin();


	get_input()
	if (!paused){
		frame++;

		// could have the render or physics happen at different frame rates...
		if (frame%1==0) physics();
		if (frame%1==0) renderer.render(scene, camera);
	} 

    stats.end();
	requestAnimationFrame(animate);
}


function get_input(){

	if (active_keys[27]) paused = !paused;
	

    p.e.body.v.x = 0;
    p.e.body.v.y = 0;

    this_v = max_v;

    count = 0;
    if (active_keys[65]) count++;
    if (active_keys[68]) count++;
    if (active_keys[83]) count++;
    if (active_keys[87]) count++;

    if (count > 1) this_v = max_v2;

    if (active_keys[65]) p.e.body.v.x = this_v;
    if (active_keys[68]) p.e.body.v.x = -this_v;
    if (active_keys[83]) p.e.body.v.y = this_v;
    if (active_keys[87]) p.e.body.v.y = -this_v;

    if (p.shot_timer < 1){
	    if (active_keys[37]) p.shoot(0);
	    if (active_keys[38]) p.shoot(1);
	    if (active_keys[39]) p.shoot(2);
	    if (active_keys[40]) p.shoot(3);
	}

    if (active_keys[81]) camera.position.z -= 10;
    if (active_keys[69]) camera.position.z += 10;

}


function physics() {
	for (var i = 0; i < scene_objects.length; i++){

		// update enemy bodies physics
		s = scene_objects[i].e.body;
		s.v.x += s.a.x;
		s.v.y += s.a.y;

        s.b.rotation.z += .01;
        
		// update player
		if (p.shot_timer > 0) p.shot_timer -= 1;

        scene_objects[i].update_vel();
		s.b.position.x += s.v.x;
		s.b.position.y += s.v.y;

		if (frame%scene_objects[i].frames_per_pulse == 1){
			scene_objects[i].shoot();
		}


		// update enemy bullets
		for (var j = 0; j < scene_objects[i].e.bullets.length; j++){

			s = scene_objects[i].e.bullets[j];

			s.v.x += s.a.x;
			s.v.y += s.a.y;
			s.b.position.x += s.v.x;
			s.b.position.y += s.v.y;
			s.life --;
			
		}
	}
};


window.requestAnimFrame = (function () {
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (  callback,  element) {
	window.setTimeout(callback, 1000 / 60);
};
})();