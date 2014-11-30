
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
