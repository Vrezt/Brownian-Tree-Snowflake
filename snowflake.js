"use strict";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

var particles = [];

ctx.translate(canvas.width/2, canvas.height/2);
ctx.rotate(Math.PI/2);

var offsetX = 0;

function generate(){
	particles[particles.length] = {
		x : 700 - offsetX,
		y : 0
	}
} generate();

function distance(x1, y1, x2, y2){
	var distX = x2 > x1 ? x2 - x1 : x1 - x2;
	var distY = y2 > y1 ? y2 - y1 : y1 - y2;
	var result = Math.sqrt((distX * distX) + (distY * distY));
	return result;
}


function circle(object){
	ctx.beginPath();	
	ctx.arc(object.x, object.y, 1, 0, 2 * Math.PI); // radius = 1px
	ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
	ctx.fill();
}

function collision(particle){
	for(var i = 0; i < particles.length; i++){
		if(particles[i] == particle)continue;
		var dist = distance(particles[i].x, particles[i].y, 
							particle.x, particle.y);
		if(dist <= 2) return true;
	}
	return false;
}

function move(particle){
	while(particle.x > 1 && !collision(particle)){
		particle.x -= 1.25;
		particle.y += Math.random() >= 0.5 ? 0.9 : -0.9;
		if(particle.y > particle.x)particle.y = 0;
		if(particle.y < -particle.x)particle.y = 0;

	}
}

function draw(){
	var i = particles.length - 1;
	move(particles[i]);
	for(var ii = 0; ii < 6; ii++){
		circle(particles[i]);
		ctx.save();
		ctx.scale(1, -1);
		circle(particles[i]);
		ctx.restore();
		ctx.rotate(Math.PI/3);
	}
	if(particles[i].x >= 200)return;
	if(particles[i].x > 100)offsetX = 500;
	generate();
	requestAnimationFrame(draw);
}
draw();