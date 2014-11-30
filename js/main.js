/*

GLOBAL VARIABLES

*/


// for three.js
var container, scene, camera, renderer, spheres, s, player; //s == rot speed


// build materials

var e_body_mat = [];
for (var i = 0; i < e_body_tex.length; i++){
	e_body_mat.push(   new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, .1, .1 ), map: e_body_tex[i], transparent: true })   );
}

var e_bullet_mat = [];
for (var i = 0; i < e_bullet_tex.length; i++){
	e_bullet_mat.push(   new THREE.MeshBasicMaterial({ color: new THREE.Color( .9, .6, 0 ), map: e_bullet_tex[i], transparent: true })   );
}

var p_body_mat = new THREE.MeshBasicMaterial({ color: new THREE.Color( .3, .5, 1 ), map: p_body_tex, transparent: true });
var p_bullet_mat = new THREE.MeshBasicMaterial({ color: new THREE.Color( 0, .9, .1 ), map: e_bullet_tex[1], transparent: true })  
 
var	scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(5, w / h, 1, 9500);

var	p; // making it global, since enemies need the location

var w; var h; // window-viewport dimensions


// more
var frame = 0;
var scene_objects = [];
var stats = new Stats();

var max_v = .4;
var max_v2 = .4*.66;
var active_keys = [];
for (var i = 0; i < 100; i++) active_keys[i] = 0;


$(window).load(function(){
	init();
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

	camera.position.z = 450;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.rotation.z = Math.PI;

	p = new player();

	// create 10 enemies with random positions,velocities, num_bullets
	var e = [];
	for (var i = 0; i < 10; i++){

		var start_v = {x:r2(-.1,.1),y:r2(-.1,.1)};
		var bullet_v = {x:r2(-1,1)*.3,y:r2(-1,1)*.3};

		var body_size = ri(1,5);

		var enemy_type = ri(1,4);

		e[i] = new enemy(body_size,ri(2,e_bullet_mat.length-1),ri(3,15),bullet_v,ri(150,200),{x:r(.5*w),y:r(.5*h)}, start_v, enemy_type, 1);
	}

	add_scene_objects();

	animate(); // last step of init... start game loop
}



function r(x){
	return (Math.random()-.5)*.1*x;
}

function r2(min, max) {
    return Math.random() * (max - min) + min;
}

function ri(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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



function player(){

	this.e = {body:0, bullets:[]};

	var geometry = new THREE.PlaneGeometry( 2, 2 );
	var plane = new THREE.Mesh( geometry, p_body_mat );

	this.e.body = {b:plane, v:{x:0,y:0}, a:{x:0,y:0}, life:200};

	this.e.body.b.position.x = 0;
	this.e.body.b.position.y = 0;

	this.e.body.v.x = 0
	this.e.body.v.y = 0;

	this.shot_timer = 0;

	bullets_idx = 0;
	bullets_max = 20; // going to need to recycle bullets... can't just create thousands and thousands

	this.shoot = function(dir){


		console.log('shot');
		
		this.e.
		
		bullet_v = 1;
		//remove_scene_objects();
	
		this.e.bullets.push( {b:[], v:{x:0,y:0}, a:{x:0,y:0}, life:200} );

		var geometry = new THREE.PlaneGeometry( 2, 2 );
		var plane = new THREE.Mesh( geometry, p_bullet_mat );

		this.e.bullets[bullets_idx].b = plane;

		this.e.bullets[bullets_idx].b.position.x = this.e.body.b.position.x;
		this.e.bullets[bullets_idx].b.position.y = this.e.body.b.position.y;
		//this.e.bullets[i].v.x = this.e.body.v.x;
		//this.e.bullets[i].v.y = this.e.body.v.y;

		if (dir==0){
			this.e.bullets[bullets_idx].v.x += 1;
		} else if (dir==1){
			this.e.bullets[bullets_idx].v.y -= 1;
		} else if (dir==2){
			this.e.bullets[bullets_idx].v.x -= 1;
		} else if (dir==3){
			this.e.bullets[bullets_idx].v.y += 1;
		}
		add_scene_objects();
		this.shot_timer = 200;
		bullets_idx ++;
		
		

	}

	scene_objects.push(this);
}




function enemy(body_size,bullet_size, num_bullets, bullet_v, frames_per_pulse, start_loc, start_v, shot_type, ai_type){

	this.e = {body:0, bullets:[]};

	this.frames_per_pulse = frames_per_pulse;
	this.ai_type = ai_type;
	this.bullet_size = bullet_size;

	var geometry = new THREE.PlaneGeometry( body_size+1, body_size+1 );
	var plane = new THREE.Mesh( geometry, e_body_mat[0] );

	this.e.body = {b:plane, v:{x:0,y:0}, a:{x:0,y:0}, life:200};

	this.e.body.b.position.x = start_loc.x;
	this.e.body.b.position.y = start_loc.y;

	this.e.body.v.x = start_v.x;
	this.e.body.v.y = start_v.y;

	this.shoot = function(){
		remove_scene_objects();

		rand_vel = r2(.01,.02);

		for (var i = 0; i < num_bullets; i++){
			this.e.bullets[i] = {b:[], v:{x:0,y:0}, a:{x:0,y:0}, life:200};

			var geometry = new THREE.PlaneGeometry( this.bullet_size-.5, this.bullet_size-.5 );

			var plane = new THREE.Mesh( geometry, e_bullet_mat[this.bullet_size] );

			this.e.bullets[i].b = plane;

			this.e.bullets[i].b.position.x = (this.e.body.b.position.x);
			this.e.bullets[i].b.position.y = (this.e.body.b.position.y);


			if (shot_type == 1){ // elipse
				this.e.bullets[i].v.x = this.e.body.v.x + (Math.sin(2*Math.PI * i/num_bullets)*bullet_v.x);
				this.e.bullets[i].v.y = this.e.body.v.y +(Math.cos(2*Math.PI * i/num_bullets)*bullet_v.y);
			} else if (shot_type == 2){ // circle
				this.e.bullets[i].v.x = this.e.body.v.x + (Math.sin(2*Math.PI * i/num_bullets)*bullet_v.x);
				this.e.bullets[i].v.y = this.e.body.v.y +(Math.cos(2*Math.PI * i/num_bullets)*bullet_v.x);
			} else if (shot_type == 3){ // line at player
				dir_p = {x:0,y:0};
				dir_p.x = (p.e.body.b.position.x - this.e.body.b.position.x);
				dir_p.y = (p.e.body.b.position.y - this.e.body.b.position.y);
				norm = Math.abs(Math.sqrt( (dir_p.x*dir_p.x + dir_p.y*dir_p.y) ));
		
				this.e.bullets[i].v.x = this.e.body.v.x + dir_p.x/norm*(i+1)*rand_vel;
				this.e.bullets[i].v.y = this.e.body.v.y + dir_p.y/norm*(i+1)*rand_vel;
			} else if (shot_type == 4){ // frayed line at player
				dir_p = {x:0,y:0};
				dir_p.x = p.e.body.b.position.x - this.e.body.b.position.x;
				dir_p.y = p.e.body.b.position.y - this.e.body.b.position.y;
				norm = Math.abs(Math.sqrt( (dir_p.x*dir_p.x + dir_p.y*dir_p.y) ));
				this.e.bullets[i].v.x = this.e.body.v.x + dir_p.x/norm*(i*.01+.1) + r2(-1,1)*.05;
				this.e.bullets[i].v.y = this.e.body.v.y + dir_p.y/norm*(i*.01+.1) + r2(-1,1)*.05;
			} 




		}
		add_scene_objects();

	}

	scene_objects.push(this);

}



function animate() {
	stats.begin();

	frame++;

	physics();
	get_input();
	renderer.render(scene, camera);

    stats.end();
	requestAnimationFrame(animate);
}


function get_input(){

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

		// update enemy bodies
		s = scene_objects[i].e.body;
		s.v.x += s.a.x;
		s.v.y += s.a.y;

		// update player
		if (p.shot_timer > 0) p.shot_timer -= 1;


		// bounce off walls!
		if (scene_objects[i].ai_type == 1){
			if ( Math.abs(s.b.position.x) > .05*w){
				s.v.x *= -1;
			}
			if ( Math.abs(s.b.position.y) > .05*h){
				s.v.y *= -1;

			}

		}


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