/*!
 * froala_editor v2.3.2 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FE.DEFAULTS,{}),a.FE.URLRegEx=/(\s|^|>)((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+(\.[a-zA-Z]{2,3})?(:\d*)?(\/[^\s<]*)?)(\s|$|<)/gi,a.FE.PLUGINS.url=function(b){function c(d){d.each(function(){if("IFRAME"!=this.tagName)if(3==this.nodeType){var d=this.textContent.replace(/&nbsp;/gi,"");a.FE.URLRegEx.test(d)&&(a(this).before(d.replace(a.FE.URLRegEx,'$1<a href="$2">$2</a>$7')),a(this).remove())}else 1==this.nodeType&&["A","BUTTON","TEXTAREA"].indexOf(this.tagName)<0&&c(b.node.contents(this))})}function d(){b.events.on("paste.afterCleanup",function(b){return a.FE.URLRegEx.test(b)?b.replace(a.FE.URLRegEx,'$1<a href="$2">$2</a>$7'):void 0}),b.events.on("keyup",function(d){var e=d.which;(e==a.FE.KEYCODE.ENTER||e==a.FE.KEYCODE.SPACE)&&c(b.node.contents(b.$el.get(0)))}),b.events.on("keydown",function(c){var d=c.which;if(d==a.FE.KEYCODE.ENTER){var e=b.selection.element();if(("A"==e.tagName||a(e).parents("a").length)&&b.selection.info(e).atEnd)return c.stopImmediatePropagation(),"A"!==e.tagName&&(e=a(e).parents("a")[0]),a(e).after("&nbsp;"+a.FE.MARKERS),b.selection.restore(),!1}})}return{_init:d}}});
