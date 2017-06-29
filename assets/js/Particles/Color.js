function Color (options) {
    if(!options){
	options = [];
    }
    
    this.minR = options.minR || 0;
    this.maxR = options.maxR || 255;
    this.minG = options.minG || 0;
    this.maxG = options.maxG || 255;
    this.minB = options.minB || 0;
    this.maxB = options.maxB || 255;
    this.minAlpha = options.minAlpha || 0;
    this.maxAlpha = options.maxAlpha || 1;

    this.r = options.r || Math.floor(Math.random() * (this.maxR - this.minR) + this.minR);
    this.g = options.g || Math.floor(Math.random() * (this.maxG - this.minG) + this.minG);
    this.b = options.b || Math.floor(Math.random() * (this.maxB - this.minB) + this.minB);
    this.alpha = options.alpha || 0.9;

}

Color.prototype = {
    getStringColor: function(){
	return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ', ' + this.alpha + ')';
    }
}
