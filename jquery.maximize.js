/**
* jquery.maximizer - jQuery plugin for scaling images
* Copyright 2010 Jarek Zmudzinski
* Released under the MIT and GPL licenses.
* @requires jQuery
*/
jQuery(function ($) {

  $.fn.maximize = function (options) {
    if (!this.length) {
      return this;
    }
    var config = $.extend({}, $.fn.maximize.defaults, options);

    return this.each(function () {
      var img = $(this).find('img'),
        maximized = $(this),
        imgWrapper = maximized.find('div'),
        padding = $.map('marginTop marginRight marginBottom marginLeft'.split(' '), 
          function (x) { 
            return parseInt(imgWrapper.css(x), 10); 
          }),
        borders = $.map('borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth'.split(' '), 
          function (x) { 
            return parseInt(img.css(x), 10); 
          }),
        container_css = {},
        img_css = {},
        timer;

      container_css[config.align] = 0;
      img_css[config.align] = 0;
      $(this).css($.extend({position: 'fixed',	top: 0, width: '100%', height: '100%', overflow: 'hidden'}, container_css));
      img.hide().css($.extend({
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'hidden'
      }, img_css));

      var resize = function () {
        var w_h = $(window).height(),
          w_w = $(window).width(),
          w_ratio,
          img_w, 
          img_h,
          img_size = maximized.data('img_size');

        if (imgWrapper.length) {
          imgWrapper.height(w_h - padding[0] - padding[2]);
        }

        w_h = imgWrapper.height();
        w_w = imgWrapper.width();
        w_ratio = w_w / w_h;
        maximized.trigger('maximizerResize', [w_w, w_h]);

        if (config.resize === 'crop') {
          if (w_ratio > img_size.ratio) {
            img_w = w_w;
            img_h = w_w / img_size.ratio;
          } else {
            img_w = w_h * img_size.ratio;
            img_h = w_h;
          }
        } else {
          if (w_ratio < img_size.ratio) {
            img_w = w_w - borders[1] - borders[3];
            if (config.zoomInLimit > 0 && img_w > img_size.width * config.zoomInLimit) {
              img_w = img_size.width * config.zoomInLimit;
            }
            if (config.maxWidth > 0 && img_w > config.maxWidth) {
              img_w = config.maxWidth;
            }
            img_h = (img_w / img_size.ratio) - borders[0] - borders[2];
            if (config.maxHeight > 0 && img_h > config.maxHeight) {
              img_h = config.maxHeight;
              img_w = img_h * img_size.ratio;
            }
          } else {
            img_h = w_h - borders[0] - borders[2];
            if (config.zoomInLimit > 0 && img_h > img_size.height * config.zoomInLimit) {
              img_h = img_size.height * config.zoomInLimit;
            }
            if (config.maxHeight > 0 && img_h > config.maxHeight) {
              img_h = config.maxHeight;
            }
            img_w = (img_h * img_size.ratio) - borders[1] - borders[3];
            if (config.maxWidth > 0 && img_w > config.maxWidth) {
              img_w = config.maxWidth;
              img_h = img_w / img_size.ratio;
            }
          }
        }
        img.width(img_w).height(img_h);
        if ($.inArray(config.center, ['both', 'horizontal']) !== -1) {
          img.css({left: (w_w - img_w) / 2});
        }
        if ($.inArray(config.center, ['both', 'vertical']) !== -1) {
          img.css({top: (w_h - img_h) / 2});
        }
      };

      timer = setInterval(function () {
        var w, h, r;
        if (img[0].complete) {
          w = img.width();
          h = img.height();
          r = w / h;
          maximized.data('img_size', {width: w, height: h, ratio: r});
          resize();
          maximized.trigger('beforeShow');
          img.css({visibility: 'visible'}).fadeIn(500, 'swing');
          clearInterval(timer);
        }
      }, 50);

      $(window).bind('resize', function () {
        resize();
      });
    });
  };

  $.fn.maximize.defaults = {
    center: 'both', //'horizontal','vertical'
    align: 'left',
    resize: 'crop', // 'fill'
    zoomInLimit: 0, // works with {resize: 'fill'} only
    maxWidth: 0, 
    maxHeight: 0
  };

});
