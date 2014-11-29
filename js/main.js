/*

GLOBAL VARIABLES

*/


// for three.js
var container, scene, camera, renderer, spheres, s, player; //s == rot speed

var mat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, 0, 0 ), map: tex2, transparent: true });
var mat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color( 1, .5, 0 ), map: tex1, transparent: true });

// more
var num_spheres = 500; var frame = 0;
var scene_objects = [];
var stats = new Stats();




$(window).load(function(){
	init();
});


function init() {


	stats.setMode(0); // 0: fps, 1: ms
	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	var canvas = document.createElement('canvas');
	canvas.id = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.opacity = '1';

	//three.js init...
	var container = document.createElement('container');
	container.id = "container";
	container.width = window.innerWidth;
	container.height = window.innerHeight;
	document.body.appendChild(container);

	renderer = new THREE.WebGLRenderer({antialias:false});
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 9500);
	camera.position.z = 250;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.rotation.z = Math.PI;

	scene = new THREE.Scene();

	add_enemy(50, {x:5,y:0});
	add_enemy(50, {x:-5,y:0});

	for (var i = 0; i < scene_objects.length; i++){

		scene.add(scene_objects[i].body.b);


		for (var j = 0; j < scene_objects[i].bullets.length; j++){
			scene.add(scene_objects[i].bullets[j].b);
		}
	}

	animate(); // last step of init... start game loop
}


function add_enemy(num_bullets, start_loc){

	enemy = {body:0, bullets:[]};

	var geometry = new THREE.PlaneGeometry( 2, 2 );
	var plane = new THREE.Mesh( geometry, mat1 );

	enemy.body = {b:plane, v:{x:0,y:0}, a:{x:0,y:0}, life:200};

	enemy.body.b.position.x = (start_loc.x);
	enemy.body.b.position.y = (start_loc.y);

	enemy.body.v.x = .02;

	// bullets
	for (var i = 0; i < num_bullets; i++){
		enemy.bullets[i] = {b:[], v:{x:0,y:0}, a:{x:0,y:0}, life:200};
		var geometry = new THREE.PlaneGeometry( 1, 1 );

		var plane = new THREE.Mesh( geometry, mat2 );
		enemy.bullets[i].b = plane;

		enemy.bullets[i].b.position.x = (start_loc.x);
		enemy.bullets[i].b.position.y = (start_loc.y);

		enemy.bullets[i].v.x = enemy.body.v.x + (Math.sin(2*Math.PI * i/num_bullets)*.03);
		enemy.bullets[i].v.y = enemy.body.v.y +(Math.cos(2*Math.PI * i/num_bullets)*.03);
	}

	scene_objects.push(enemy);

}



function animate() {
	stats.begin();

	frame++;
	physics();
	renderer.render(scene, camera);

    stats.end();
	requestAnimationFrame(animate);
}


function physics() {
	for (var i = 0; i < scene_objects.length; i++){

		// update enemy bodies
		s = scene_objects[i].body;
		s.v.x += s.a.x;
		s.v.y += s.a.y;
		s.b.position.x += s.v.x;
		s.b.position.y += s.v.y;


		// update enemy bullets
		for (var j = 0; j < scene_objects[i].bullets.length; j++){

			s = scene_objects[i].bullets[j];

			s.v.x += s.a.x;
			s.v.y += s.a.y;
			s.b.position.x += s.v.x;
			s.b.position.y += s.v.y;
			s.life --;
			/*
			if (Math.random() > .02){
				s[i].b.material.color.r = 1;
			} else {
				s[i].b.material.color.r = 0;
			} */
		}
	}
};


window.requestAnimFrame = (function () {
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (  callback,  element) {
	window.setTimeout(callback, 1000 / 60);
};
})();