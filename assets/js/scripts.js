// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
// Need this to show animation when go back in browser
window.onunload = function() {};

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});
var PE = [];
// All others
$(document).ready(function() {
    // zoom in/zoom out animations
    if ($(".container").hasClass('fadeOut')) {
        $(".container").removeClass("fadeOut").addClass("fadeIn");
    }
    if ($(".wrapper").hasClass('fadeOut')) {
        $(".wrapper").removeClass("fadeOut").addClass("fadeIn");
    }
    $(".zoombtn").click(function() {
        $(".container").removeClass("fadeIn").addClass("fadeOut");
        $(".wrapper").removeClass("fadeIn").addClass("fadeOut");
    });
    // go up button
    $.goup({
        trigger: 500,
        bottomOffset: 10,
        locationOffset: 20,
        containerRadius: 0,
        containerColor: '#fff',
        arrowColor: '#000',
        goupSpeed: 'normal'
    });
	$('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });

    // Particle settings
    if($('#particles-animation').length){
	var canvas = document.getElementById('particles-animation');
	var opt = [];
	opt.color = new Color();
	opt.color.r = 190;
	opt.color.g = 150;
	opt.color.b = 80;
	opt.numberParticles = 800;
	opt.distanceParticles = 100;
	opt.maxV = 0.5;


	PE.push(new ParticleEngine(canvas, opt));
	var edges = [];
	var edges_speed = [];
	var max_opacity = 0.4;
	var speed_opacity = 0.005;
	PE[0].drawEdges = function(){
	    for(var iParticle = 0; iParticle < this.particleSettings.number; iParticle++) {
		for(var jParticle = iParticle+1; jParticle < this.particleSettings.number; jParticle++) {
		    particle1 = this.particleSettings.array[iParticle];
		    particle2 = this.particleSettings.array[jParticle];

		    // If the particles are close enough
		    if (Math.abs(particle1.x - particle2.x) <  this.particleSettings.distance && Math.abs(particle1.y - particle2.y) < this.particleSettings.distance) {
			// An edge was already drawn
			e = edges[linearIndex(iParticle,jParticle,this.particleSettings.number)];
			if(e > 0){
			    // Draw it 
			    this.ctx.beginPath();
			    if(Math.abs(particle1.x - mousePosition.x + this.canvas.offsetLeft) < this.particleSettings.radius && Math.abs(particle1.y - mousePosition.y + this.canvas.offsetTop) < this.particleSettings.radius){
				this.ctx.strokeStyle = 'rgba(255,255,255,' + e + ')';
			    }else{
				this.ctx.strokeStyle = 'rgba(' + particle1.color.r + ',' + particle1.color.g + ',' + particle1.color.b + ', ' + e + ')';
			    }

			    
			    this.ctx.moveTo(particle1.x, particle1.y);
			    this.ctx.lineTo(particle2.x, particle2.y);
			    this.ctx.stroke();
			    this.ctx.closePath();
			    edges[linearIndex(iParticle,jParticle,this.particleSettings.number)] = e + edges_speed[linearIndex(iParticle,jParticle,this.particleSettings.number)];
			    if(edges[linearIndex(iParticle,jParticle,this.particleSettings.number)] > max_opacity){
				edges_speed[linearIndex(iParticle,jParticle,this.particleSettings.number)] = -speed_opacity;
			    }
			    
			}else{ // otherwise create one (maybe)
			    if(Math.random()>0.99){
				edges[linearIndex(iParticle,jParticle,this.particleSettings.number)] = speed_opacity;
				edges_speed[linearIndex(iParticle,jParticle,this.particleSettings.number)] = speed_opacity;
			    }
			}
		    }else{ // otherwise hide
			edges[linearIndex(iParticle,jParticle,this.particleSettings.number)] = edges[linearIndex(iParticle,jParticle,this.particleSettings.number)] - speed_opacity;
		    }
		    
		    
		}
	    }
	}

	// Initialize engines
	initializeEngines();

	// Now animate all
	requestAnimationFrame(animate);

    }

});
