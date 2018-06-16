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
 * Firefox 59+
 * Chrome 49+
 * Chrome for Android 66+
 * IE 11+
 * Edge 16+
 * Safari 11.1+
 * iOS Safari 10.3+


Requirements
============
 * jQuery 1.7.0+


License
=======
Distributed under MIT License.

