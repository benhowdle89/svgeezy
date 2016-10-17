/*
 * SVGeezy.js
 *
 * Copyright 2016, Ben Howdle http://benhowdle.im
 *
 * Date: Sun Aug 26 20:38 2012 GMT
 */

/*
	//call like so, pass in a class name that you don't want it to check and a filetype to replace .svg with
	svgeezy.init('nocheck', 'png');
*/

window.svgeezy = function() {

	return {

		init: function(avoid, filetype, forceFallbackAlways) {
			this.avoid = avoid || false;
			this.filetype = filetype || 'png';
			this.svgSupport = !forceFallbackAlways || this.supportsSvg();
			if(!this.svgSupport) {
				this.images = document.getElementsByTagName('img');
				this.imgL = this.images.length;
				this.fallbacks();
			}
		},

		fallbacks: function() {
			if (this.imgL == 0) {
				return;
			}
			while(--this.imgL) {
				if(this.avoid && this.hasClass(this.images[this.imgL], this.avoid)) {
					continue;
				}
				var src = this.images[this.imgL].getAttribute('src');
				if(src === null || this.getFileExt(src) != 'svg') {
					continue;
				}
				var newSrc = src.replace('.svg', '.' + this.filetype);
				this.images[this.imgL].setAttribute('src', newSrc);
				
			}
		},

		getFileExt: function(src) {
			var ext = src.split('.').pop();

			if(ext.indexOf("?") !== -1) {
				ext = ext.split('?')[0];
			}

			return ext;
		},

		hasClass: function(element, cls) {
			return(' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		},

		supportsSvg: function() {
			return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
		}
	};

}();
