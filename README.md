Visible.js
==========
jQuery Visible/Unvisible Plug-in based on DOM listener and independent from way of visibility changing. 

It generates `becameVisible` and `becameUnvisible` events that can be catched by jQuery:

    ...
    
    $('#my_tag').on('becameVisible', function() {
        alert('Visible');
    });
    
    $('#my_tag').on('becameUnvisible', function() {
        alert('Unvisible');
    });
    
    ...
    
See this [example](https://github.com/dzavodnikov/Visible.js/blob/master/example.html) ([run](https://dzavodnikov.github.io/Visible.js/example.html)).



Supported browsers
==================
All browsers, that supported by [jQuery](https://jquery.com/browser-support/) AND 
[Mutation Observer](http://caniuse.com/#feat=mutationobserver):
 * Firefox
 * Chrome
 * Opera (NOT support 12.1x)
 * Internet Explorer 11+ (jQuery 1.x -- 6+, jQuery 2.x -- 9+)
 * Safari 6.0+ (jQuery 1.x/2.x -- 5.1+)
 * iOS Safari
 * Android Browser 4.4+ (jQuery 1.x/2.x -- 2.3, 4.4+)


Requirements
============
 * jQuery 1.7.0+/2.0.0+


License
=======
Distributed under MIT License.

