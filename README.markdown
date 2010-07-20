Image Maximizer
===

jQuery plugin useful for resizing images to browser window size. 
It keeps the image maximized while resizing window.

Usage
===
HTML
---
    <div id="container">
    	<div id="imageWrapper">
    		<img src="image.jpg" alt="" />
    	</div>
    </div>

JS
---
    $('#container').maximize();
    
Config options
---

### center
* both (default)
* horizontal
* vertical

### align
* left (default)
* right

### resize
* crop (default)
* fill

### zoomInLimit 
* 0 (default) - max magnification factor

### maxWidth 
* 0 (default) - image width limit [px]

### maxHeight
* 0 (default) - image height limit [px]

Live examples
===

Background image maximized and cropped.
---
* [LINGEXPERT.PL](http://lingexpert.pl)
* [NACZYNIA.WELMAX.PL](http://naczynia.welmax.pl)

Background image maximized without cropping.
---
* [LASHLO.COM](http://lashlo.com)
	