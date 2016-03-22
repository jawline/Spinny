function Spinny(loader, lbar, rbar, settings) {
	this.loader = loader;
	this.left_bar = lbar;
	this.right_bar = rbar;
	this.settings = settings || {};
}

Spinny.prototype.start = function() {
	
	this.loader.velocity({
		rotateZ: 360
	}, {
		duration: 1500,
		loop: true
	});

	return this;
}

Spinny.prototype.stop = function() {

	this.loader.velocity({opacity: 0}, {
		duration: this.settings.fade_duration || 1000,
		progress: function(elements, complete, remaining, start, tweenValue) {
	        if (remaining == 0) {
	        	this.loader.velocity('stop');
	        	
	        	this.left_bar.velocity({
					left: '-50%'
				}, {
					duration: this.settings.slide_duration || 500
				});

				this.right_bar.velocity({
					left: '100%'
				}, {
					duration: this.settings.slide_duration || 500
				});
	        }
	    }.bind(this),
    	loop: false
    });
	return this;
}