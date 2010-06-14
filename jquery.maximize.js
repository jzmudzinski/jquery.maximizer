/**
 * jquery.maximizer - jQuery plugin for scaling images
 * Copyright 2010 Jarek Zmudzinski
 * Released under the MIT and GPL licenses.
 * @requires jQuery
 */
;(function($){

	$.fn.maximize = function(options){
		if ( !this.length ) {return this;}
		var config = $.extend({
			center: 'both', //'horizontal','vertical'
			align: 'left',
			zoomLimit: 0,
			resize: 'crop' // 'fill'
		}, options);
	
		return this.each(function(){
			var img = $(this).find('img'),
				maximized = $(this),
				imgWrapper = maximized.find('div'),
				padding = $.map(
					['marginTop','marginRight','marginBottom','marginLeft'], 
					function(x){ 
						return parseInt(imgWrapper.css(x), 10); 
					}),
				borders = $.map(
					['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'], 
					function(x){ 
						return parseInt(img.css(x), 10); 
					}),
				img_ratio,
				container_css = {},
				img_css = {},
				timer;

			container_css[config.align] = 0;
			img_css[config.align] = 0;
			$(this).css($.extend({position: 'fixed',	top: 0, width: '100%', height: '100%', overflow: 'hidden'},container_css));
			img.hide().css($.extend({
					position: 'absolute',
					top: 0,
					left: 0,
					visibility: 'hidden'
				}, img_css));

			var resize = function(){
				var w_h = $(window).height(),
					w_w = $(window).width(),
					w_ratio,
					img_w, img_h;

				if (imgWrapper.length) {
					imgWrapper.height(w_h - padding[0] - padding[2]);
				}

				w_h = imgWrapper.height();
				w_w = imgWrapper.width();
				w_ratio = w_w / w_h;
				maximized.trigger('maximizerResize', [w_w,w_h]);

				if ( config.resize == 'crop' ) {
					if ( w_ratio > img_ratio ) {
						img_w = w_w;
						img_h = w_w / img_ratio;
						img.width(w_w).height(img_h);
					} else {
						img_w = w_h * img_ratio;
						img_h = w_h;
						img.height(w_h).width(img_w);
					}
				} else {
					if ( w_ratio < img_ratio ) {
						img_w = w_w;
						img_h = w_w / img_ratio;
						img.width(w_w - borders[1] - borders[3]).height(img_h - borders[0] - borders[2]);
					} else {
						img_w = w_h * img_ratio;
						img_h = w_h;
						img.width(img_w - borders[1] - borders[3]).height(w_h - borders[0] - borders[2]);
					}
				}
				if ( $.inArray(config.center, ['both','horizontal']) != -1 ) {
					img.css({left: (w_w - img_w) / 2});
				}
				if ( $.inArray(config.center, ['both','vertical']) != -1 ) {
					img.css({top: (w_h - img_h) / 2});
				}
			};
		
			timer = setInterval(function(){
				if ( img[0].complete ) {
					img_ratio = img.width() / img.height();
					resize();
					maximized.trigger('beforeShow');
					img.css({visibility: 'visible'}).fadeIn(500, 'swing');
					clearInterval(timer);
				}
			}, 50);
		
			$(window).bind('resize', function(){
				resize();
			});
		});
	};

})(jQuery);
