
var vill = [];

var gameArea =
{
	canvas : document.createElement('canvas'),
	start : function(){
		this.canvas.id = 'canvasID';
		this.context = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
		this.canvas.width = 400;
		this.canvas.height = 400;
		this.interval = setInterval(gamePlay, 20);
	},
	clearCanvas : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function(){
		clearInterval(this.interval);
	}
}
function startGame(){
	gameArea.start();
	// alert(gameArea.context);
	shiva = new myObject(20, 20, 20, 20, 'green');
	//shiva.draw();
	vill[0] = new myObject(440, 550, 20, 20, 'red');
	//vill[0].draw();
}

setInterval(function(){ //generate new Villian every 10 seconds at rand pos
	var xVal = (Math.random()*(gameArea.canvas.width-0));
	var yVal = (Math.random()*(gameArea.canvas.height-0));
	
	vill.push(new myObject(xVal, yVal, 20, 20, 'red'));

}, 5000)


function myObject(x, y, width, height, color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	context = gameArea.context
	this.xSpeed = 0;
	this.ySpeed = 0;
	//context.stroke();
	this.changePos = function(newX, newY){
		this.x = newX;
		this.y = newY;
	}
	this.draw = function(){
		
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
	this.moveTowards = function(sampleObject){
		if(this.x > sampleObject.x){
			this.x -= 1;
		}
		else{
			this.x += 1;
		}
		if(this.y < sampleObject.y){
			this.y += 1;
		}
		else{
			this.y -= 1;
		}
		// if(this.x == sampleObject.x && this.y == sampleObject.y){
		// 	gameArea.stop();
		// 	alert('game over');
		// }
	}
	this.collideWith = function(sampleObject){
		if ((this.y+this.height < sampleObject.y) || (this.y > sampleObject.y+sampleObject.height) || (this.x+this.width < sampleObject.x) || (this.x > sampleObject.x+sampleObject.width)) {
       		return false;
        }
	    
        return true;
	}

}

function gamePlay(){
	gameArea.clearCanvas();
	for(let i=0;i<vill.length;i++){
		vill[i].moveTowards(shiva);
		vill[i].draw();
		for(let j=0;j<vill.length;j++){
			if(j!=i && vill[i].collideWith(vill[j])){
				vill.splice(vill[i], 1);
				vill.splice(vill[j], 1);
				//context.clearRect(vill[i].x, vill[i].y, vill[i].width, vill[i].height);
				//context.clearRect(vill[j].x, vill[j].y, vill[j].width, vill[j].height);
			}

		}
	}
	for(let i=0;i<vill.length;i++){
		if(shiva.collideWith(vill[i])){
			gameArea.stop();
			alert("game over");
		}
	}
	
	shiva.changePos(shiva.x+shiva.xSpeed, shiva.y+shiva.ySpeed);
	shiva.draw();
	
}

document.addEventListener('keydown', function(event){
	if(event.keyCode == 87){ // up
		shiva.ySpeed -= 1;
		
	}
	if(event.keyCode == 65){ // left
		shiva.xSpeed -= 1;	
		
	}
	if(event.keyCode == 68){ // right
		shiva.xSpeed += 1;
		
	}
	if(event.keyCode == 83){ // down
		shiva.ySpeed += 1;
		
	}
});









