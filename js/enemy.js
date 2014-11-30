
function enemy(body_size,bullet_size, num_bullets, bullet_v, frames_per_pulse, start_loc, start_v, shot_type, ai_type){

	this.e = {body:0, bullets:[]};

	this.frames_per_pulse = frames_per_pulse;
	this.ai_type = ai_type;
	this.bullet_size = bullet_size;


	//var plane = new THREE.Mesh( geometry, e_body_mat[0] );
	var plane = new THREE.Mesh( new THREE.PlaneGeometry( body_size, body_size ), NewRandomMaterial(size=25*body_size) );

	this.e.body = {b:plane, v:{x:0,y:0}, a:{x:0,y:0}, life:200};

	this.e.body.b.position.x = start_loc.x;
	this.e.body.b.position.y = start_loc.y;

	this.e.body.v.x = start_v.x;
	this.e.body.v.y = start_v.y;

	this.shoot = function(){

		remove_scene_objects();

		rand_vel = r(.01,.02);

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
				this.e.bullets[i].v.x = this.e.body.v.x + dir_p.x/norm*(i*.01+.1) + r(-1,1)*.05;
				this.e.bullets[i].v.y = this.e.body.v.y + dir_p.y/norm*(i*.01+.1) + r(-1,1)*.05;
			} 

		}
		add_scene_objects();

	}

	scene_objects.push(this);
}