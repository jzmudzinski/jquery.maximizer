$.fn.maximize = function(options){
	if ( !this.length ) {return this;}
	var config = $.extend({
		center: 'both', //'horizontal','vertical'
		align: 'left',
		containerPadding: [0,0,0,0],
		resize: 'crop' // 'fill'
	}, options);
	
	return this.each(function(){
		var img = $(this).find('img'),
				img_ratio,
				container_css = {},
				img_css = {},
				timer;
		
		container_css[config.align] = 0;
		img_css[config.align] = 0;
		$(this)
			.css($.extend({position: 'fixed',	top: 0, width: '100%', height: '100%', overflow: 'hidden'},container_css));
		img
			.hide()
			.css($.extend({
				position: 'absolute',
				top: config.containerPadding[0], 
				left: config.containerPadding[3], 
				visibility: 'hidden'
			}, img_css));

		var resize = function(){
			var w_h = $(window).height(),
					w_w = $(window).width(),
					w_ratio = w_w / w_h,
					img_w, img_h;

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
					img.width(w_w -  config.containerPadding[1] - config.containerPadding[3]).height(img_h - config.containerPadding[0] - config.containerPadding[2]);
				} else {
					img_w = w_h * img_ratio;
					img_h = w_h;
					img.width(img_w -  config.containerPadding[1] - config.containerPadding[3]).height(w_h - config.containerPadding[0] - config.containerPadding[2]);
				}
			}
			if (config.center == 'both' || config.center == 'horizontal') {
				img.css({left: (w_w - img_w) / 2 + config.containerPadding[3]});
			}
			if (config.center == 'both' || config.center == 'vertical') {
				img.css({top: (w_h - img_h) / 2 + config.containerPadding[0]});
			}
			$('title').text(img.width() + ' x ' + img.height());
		};
		
		timer = setInterval(function(){
			if ( img[0].complete ) {
				img_ratio = img.width() / img.height();
				resize();
				img.css({visibility: 'visible'}).fadeIn(500, 'swing');
				clearInterval(timer);
			}
		}, 50);
		
		$(window).resize(function(){
			resize();
		});
	});
};
