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

Spinny.prototype.reset = function(doneCallback) {

    var d = 0;

    var postDone = function() {
    	d++;
        if (d == 2) {}

        this.loader.velocity({
            opacity: 100
        }, {
            duration: this.settings.fade_duration || 1000,
    		queue: false,
    		loop: 1,
            complete: function() {
                postDone();
            }
        });

        if (d == 3) {
        	if (doneCallback) {
            	doneCallback();
        	}
        }
    }.bind(this);

    this.left_bar.velocity({
        left: '0%'
    }, {
    	queue: false,
        duration: this.settings.slide_duration || 500,
        complete: function() {
            postDone();
        }
    });

    this.right_bar.velocity({
        left: '50%'
    }, {
    	queue: false,
        duration: this.settings.slide_duration || 500,
        complete: function() {
            postDone();
        }
    });
}

Spinny.prototype.stop = function() {

    this.loader.velocity({
    	queue: false,
        opacity: 0
    }, {
        duration: this.settings.fade_duration || 1000,
        complete: function() {
                this.loader.velocity('stop');

                this.left_bar.velocity({
    	queue: false,
                    left: '-50%'
                }, {
                    duration: this.settings.slide_duration || 500
                });

                this.right_bar.velocity({
    	queue: false,
                    left: '100%'
                }, {
                    duration: this.settings.slide_duration || 500
                });
        }.bind(this),
        loop: 1
    });
    return this;
}