function Particle (canvas, options){
    this.ctx = canvas.getContext('2d');
    /*
     * Position
     */
    this.x = options.x || Math.random() * canvas.width;
    this.y = options.y || Math.random() * canvas.height;
    /*
     * Speed
     */
    this.maxV = options.maxV || 50;
    this.vx = options.vx || Math.random()-.5; // negative or positive
    this.vy = options.vy || Math.random()-.5; // negative or positive
    while(Math.abs(this.vx) > this.maxV){
	this.vx = Math.random() -.5;
    }
    while(Math.abs(this.vy) > this.maxV){
	this.vy = Math.random() -.5;
    }
    
    this.minRadius = options.minRadius || 0.1;
    this.maxRadius = options.maxRadius || 3;
    this.radius = options.radius || this.minRadius + Math.random()*(this.maxRadius-this.minRadius);

    this.color = options.color || new Color();

    if(this.color == 'random'){
	this.color = new Color();
    }


}
Particle.prototype = {
    draw: function(){
	this.ctx.beginPath();
	this.ctx.fillStyle = this.color.getStringColor();
	this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	this.ctx.fill();
    }
}

