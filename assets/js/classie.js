/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */!function(g){"use strict";var a,b,c,d;function e(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function f(d,e){var f;(a(d,e)?c:b)(d,e)}"classList"in document.documentElement?(a=function(a,b){return a.classList.contains(b)},b=function(a,b){a.classList.add(b)},c=function(a,b){a.classList.remove(b)}):(a=function(a,b){return e(b).test(a.className)},b=function(b,c){a(b,c)||(b.className=b.className+" "+c)},c=function(a,b){a.className=a.className.replace(e(b)," ")}),d={hasClass:a,addClass:b,removeClass:c,toggleClass:f,has:a,add:b,remove:c,toggle:f},"function"==typeof define&&define.amd?define(d):g.classie=d}(window)