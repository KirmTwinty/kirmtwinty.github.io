var ParticleEngine = function(canvas, options) {

    /*
     * Default options
     */
    var defaultOptions = [];
    defaultOptions.color = 'random';
    defaultOptions.numberParticles = 120;
    defaultOptions.distanceParticles = 150;
    defaultOptions.radiusInteraction = 100;

    /*
     * Basic canvas animation properties
     */
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.options = options || defaultOptions;


    

    /*
     * Advanced options
     */
    this.color = this.options.color || defaultOptions.color; // set constant color or random ones
    // Particles engine 
    this.particleSettings = {
	number: this.options.numberParticles || defaultOptions.numberParticles,
	distance: this.options.distanceParticles || defaultOptions.distanceParticles,
	radius: this.options.radiusInteraction || defaultOptions.radiusInteraction,
	edgesOpacity: 0.2,
	array: []
    };


    if( typeof ParticleEngine.initialized == "undefined" ) {
	// Init all
	ParticleEngine.prototype.init = function() {
	    for(var iParticle = 0; iParticle < this.particleSettings.number; iParticle++) {
		this.particleSettings.array.push(new Particle(this.canvas, this.options));
	    }
	    
	}
	// Draw particles
	ParticleEngine.prototype.drawParticles = function(){
	    for(var iParticle = 0; iParticle < this.particleSettings.number; iParticle++){
		var particle = this.particleSettings.array[iParticle];
		particle.draw();
	    }
	}
	// Move particles
	ParticleEngine.prototype.moveParticles = function() {
	    for(var iParticle = 0; iParticle < this.particleSettings.number; iParticle++){
		var particle = this.particleSettings.array[iParticle];

		if(particle.y < 0 || particle.y > canvas.height){
		    particle.vx = particle.vx;
		    particle.vy = - particle.vy;
		}
		else if(particle.x < 0 || particle.x > canvas.width){
		    particle.vx = - particle.vx;
		    particle.vy = particle.vy;
		}
		particle.x += particle.vx;
		particle.y += particle.vy;
	    }
	}
	ParticleEngine.prototype.drawEdges = function() {
	    for(var iParticle = 0; iParticle < this.particleSettings.number; iParticle++) {
		for(var jParticle = iParticle+1; jParticle < this.particleSettings.number; jParticle++) {
		    particle1 = this.particleSettings.array[iParticle];
		    particle2 = this.particleSettings.array[jParticle];

		    if (Math.abs(particle1.x - particle2.x) <  this.particleSettings.distance && Math.abs(particle1.y - particle2.y) < this.particleSettings.distance) {
			if(Math.abs(particle1.x - mousePosition.x + this.canvas.offsetLeft) < this.particleSettings.radius && Math.abs(particle1.y - mousePosition.y + this.canvas.offsetTop) < this.particleSettings.radius){
			    this.ctx.beginPath();
			    this.ctx.strokeStyle = 'rgba(' + particle1.color.r + ',' + particle1.color.g + ',' + particle1.color.b + ', ' + this.particleSettings.edgesOpacity + ')';
			    this.ctx.moveTo(particle1.x, particle1.y);
			    this.ctx.lineTo(particle2.x, particle2.y);
			    this.ctx.stroke();
			    this.ctx.closePath();
			}
		    }
		}
	    }
	}

	ParticleEngine.initialized = true;
    }
}

function animate() {
    for(var i = 0; i < PE.length; i++) {
	PE[i].ctx.clearRect(0, 0, PE[i].canvas.width, PE[i].canvas.height);
	PE[i].moveParticles();
	PE[i].drawParticles();
	PE[i].drawEdges();
	
    }
    requestAnimationFrame(animate);
}
function initializeEngines() {
    for(var i = 0; i < PE.length; i++) {
	PE[i].init();
    }

}

function linearIndex(i,j,n) {
    return i*n+j;
}
var mousePosition = {
    x: 0,
    y: 0
};


$('body').on('mousemove', function(e){
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
});
