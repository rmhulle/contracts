/*!
 * froala_editor v2.3.2 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FE.POPUP_TEMPLATES,{"image.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]","image.edit":"[_BUTTONS_]","image.alt":"[_BUTTONS_][_ALT_LAYER_]","image.size":"[_BUTTONS_][_SIZE_LAYER_]"}),a.extend(a.FE.DEFAULTS,{imageInsertButtons:["imageBack","|","imageUpload","imageByURL"],imageEditButtons:["imageReplace","imageAlign","imageRemove","|","imageLink","linkOpen","linkEdit","linkRemove","-","imageDisplay","imageStyle","imageAlt","imageSize"],imageAltButtons:["imageBack","|"],imageSizeButtons:["imageBack","|"],imageUploadURL:"https://i.froala.com/upload",imageUploadParam:"file",imageUploadParams:{},imageUploadToS3:!1,imageUploadMethod:"POST",imageMaxSize:10485760,imageAllowedTypes:["jpeg","jpg","png","gif","svg+xml"],imageResize:!0,imageResizeWithPercent:!1,imageRoundPercent:!1,imageDefaultWidth:300,imageDefaultAlign:"center",imageDefaultDisplay:"block",imageSplitHTML:!1,imageStyles:{"fr-rounded":"Rounded","fr-bordered":"Bordered"},imageMove:!0,imageMultipleStyles:!0,imageTextNear:!0,imagePaste:!0,imagePasteProcess:!1,imageMinWidth:16,imageOutputSize:!1}),a.FE.PLUGINS.image=function(b){function c(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val(""),qa&&c.val(qa.attr("src")),c.trigger("change")}function d(){var a=b.$tb.find('.fr-command[data-cmd="insertImage"]'),c=b.popups.get("image.insert");if(c||(c=L()),r(),!c.hasClass("fr-active"))if(b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",b.$tb),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("image.insert",d,e,a.outerHeight())}else b.position.forSelection(c),b.popups.show("image.insert")}function e(){var c=b.popups.get("image.edit");c||(c=p()),b.popups.setContainer("image.edit",a(b.opts.scrollableContainer)),b.popups.refresh("image.edit");var d=qa.offset().left+qa.outerWidth()/2,e=qa.offset().top+qa.outerHeight();b.popups.show("image.edit",d,e,qa.outerHeight())}function f(){r()}function g(a){if(!a.hasClass("fr-dii")&&!a.hasClass("fr-dib")){var c=a.css("float");a.css("float","none"),"block"==a.css("display")?(a.css("float",c),b.opts.imageEditButtons.indexOf("imageAlign")>=0&&(0===parseInt(a.css("margin-left"),10)&&(a.attr("style")||"").indexOf("margin-right: auto")>=0?a.addClass("fr-fil"):0===parseInt(a.css("margin-right"),10)&&(a.attr("style")||"").indexOf("margin-left: auto")>=0&&a.addClass("fr-fir")),a.addClass("fr-dib")):(a.css("float",c),b.opts.imageEditButtons.indexOf("imageAlign")>=0&&("left"==a.css("float")?a.addClass("fr-fil"):"right"==a.css("float")&&a.addClass("fr-fir")),a.addClass("fr-dii")),a.css("margin",""),a.css("float",""),a.css("display",""),a.css("z-index",""),a.css("position",""),a.css("overflow",""),a.css("vertical-align","")}}function h(){for(var c="IMG"==b.$el.get(0).tagName?[b.$el.get(0)]:b.$el.get(0).querySelectorAll("img"),d=0;d<c.length;d++){var e=a(c[d]);(b.opts.imageEditButtons.indexOf("imageAlign")>=0||b.opts.imageEditButtons.indexOf("imageDisplay")>=0)&&g(e),e.attr("width")&&(e.css("width",e.width()),e.removeAttr("width")),b.opts.imageTextNear||e.removeClass("fr-dii").addClass("fr-dib"),b.opts.iframe&&e.on("load",b.size.syncIframe)}}function i(){var c,d=Array.prototype.slice.call(b.$el.get(0).querySelectorAll("img")),e=[];for(c=0;c<d.length;c++)e.push(d[c].getAttribute("src")),a(d[c]).toggleClass("fr-draggable",b.opts.imageMove),""===d[c].className&&d[c].removeAttribute("class"),""===d[c].getAttribute("style")&&d[c].removeAttribute("style");if(Da)for(c=0;c<Da.length;c++)e.indexOf(Da[c].getAttribute("src"))<0&&b.events.trigger("image.removed",[a(Da[c])]);Da=d}function j(){ra||X();var c=b.$wp||a(b.opts.scrollableContainer);c.append(ra),ra.data("instance",b);var d=c.scrollTop()-("static"!=c.css("position")?c.offset().top:0),e=c.scrollLeft()-("static"!=c.css("position")?c.offset().left:0);e-=b.helpers.getPX(c.css("border-left-width")),d-=b.helpers.getPX(c.css("border-top-width")),ra.css("top",(b.opts.iframe?qa.offset().top:qa.offset().top+d)-1).css("left",(b.opts.iframe?qa.offset().left:qa.offset().left+e)-1).css("width",qa.get(0).getBoundingClientRect().width).css("height",qa.get(0).getBoundingClientRect().height).addClass("fr-active")}function k(a){return'<div class="fr-handler fr-h'+a+'"></div>'}function l(c){if(!b.core.sameInstance(ra))return!0;if(c.preventDefault(),c.stopPropagation(),b.$el.find("img.fr-error").left)return!1;b.undo.canDo()||b.undo.saveStep(),sa=a(this),sa.data("start-x",c.pageX||c.originalEvent.touches[0].pageX),sa.data("start-width",qa.width()),sa.data("start-height",qa.height());var d=qa.width();if(b.opts.imageResizeWithPercent){var e=qa.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0)||b.$el.get(0);qa.css("width",(d/a(e).outerWidth()*100).toFixed(2)+"%")}else qa.css("width",d);ta.show(),b.popups.hideAll(),ea()}function m(c){if(!b.core.sameInstance(ra))return!0;if(sa&&qa){if(c.preventDefault(),b.$el.find("img.fr-error").left)return!1;var d=c.pageX||(c.originalEvent.touches?c.originalEvent.touches[0].pageX:null);if(!d)return!1;var e=sa.data("start-x"),f=d-e,g=sa.data("start-width");if((sa.hasClass("fr-hnw")||sa.hasClass("fr-hsw"))&&(f=0-f),b.opts.imageResizeWithPercent){var h=qa.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0)||b.$el.get(0);g=((g+f)/a(h).outerWidth()*100).toFixed(2),b.opts.imageRoundPercent&&(g=Math.round(g)),qa.css("width",g+"%"),qa.css("height","").removeAttr("height")}else g+f>=b.opts.imageMinWidth&&qa.css("width",g+f),qa.css("height",sa.data("start-height")*qa.width()/sa.data("start-width"));j(),b.events.trigger("image.resize",[oa()])}}function n(a){if(!b.core.sameInstance(ra))return!0;if(sa&&qa){if(a&&a.stopPropagation(),b.$el.find("img.fr-error").left)return!1;sa=null,ta.hide(),j(),e(),b.undo.saveStep(),b.events.trigger("image.resizeEnd",[oa()])}}function o(a,c){b.edit.on(),qa&&qa.addClass("fr-error"),t(b.language.translate("Something went wrong. Please try again.")),b.events.trigger("image.error",[{code:a,message:Ca[a]},c])}function p(a){if(a)return b.$wp&&b.events.$on(b.$wp,"scroll",function(){qa&&b.popups.isVisible("image.edit")&&e()}),!0;var c="";b.opts.imageEditButtons.length>0&&(c+='<div class="fr-buttons">',c+=b.button.buildList(b.opts.imageEditButtons),c+="</div>");var d={buttons:c},f=b.popups.create("image.edit",d);return f}function q(c){var d=b.popups.get("image.insert");if(d||(d=L()),d.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),d.find(".fr-image-progress-bar-layer").addClass("fr-active"),d.find(".fr-buttons").hide(),qa){b.popups.setContainer("image.insert",a(b.opts.scrollableContainer));var e=qa.offset().left+qa.width()/2,f=qa.offset().top+qa.height();b.popups.show("image.insert",e,f,qa.outerHeight())}"undefined"==typeof c&&s("Uploading",0)}function r(a){var c=b.popups.get("image.insert");c&&(c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),c.find(".fr-buttons").show(),(a||b.$el.find("img.fr-error").length)&&(b.events.focus(),b.$el.find("img.fr-error").remove(),b.undo.saveStep(),b.undo.run(),b.undo.dropRedo()))}function s(a,c){var d=b.popups.get("image.insert");if(d){var e=d.find(".fr-image-progress-bar-layer");e.find("h3").text(a+(c?" "+c+"%":"")),e.removeClass("fr-error"),c?(e.find("div").removeClass("fr-indeterminate"),e.find("div > span").css("width",c+"%")):e.find("div").addClass("fr-indeterminate")}}function t(a){q();var c=b.popups.get("image.insert"),d=c.find(".fr-image-progress-bar-layer");d.addClass("fr-error"),d.find("h3").text(a)}function u(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val().length>0&&(q(),s("Loading image"),x(b.helpers.sanitizeURL(c.val()),!0,[],qa),c.val(""),c.blur())}function v(a){ba.call(a.get(0))}function w(){var c=a(this);b.popups.hide("image.insert"),c.removeClass("fr-uploading"),c.next().is("br")&&c.next().remove(),v(c),b.events.trigger("image.loaded",[c])}function x(a,c,d,e,f){b.edit.off(),s("Loading image");var g=new Image;g.onload=function(){var c,g;if(e){var h=e.data("fr-old-src");b.$wp?(c=e.clone().removeData("fr-old-src").removeClass("fr-uploading"),c.off("load"),h&&e.attr("src",h),e.replaceWith(c)):c=e;for(var j=c.get(0).attributes,k=0;k<j.length;k++){var l=j[k];0===l.nodeName.indexOf("data-")&&c.removeAttr(l.nodeName)}if("undefined"!=typeof d)for(g in d)d.hasOwnProperty(g)&&"link"!=g&&c.attr("data-"+g,d[g]);c.on("load",w),c.attr("src",a),b.edit.on(),i(),b.undo.saveStep(),b.events.trigger(h?"image.replaced":"image.inserted",[c,f])}else c=D(a,d,w),i(),b.undo.saveStep(),b.events.trigger("image.inserted",[c,f])},g.onerror=function(){o(va)},g.src=a}function y(c){try{if(b.events.trigger("image.uploaded",[c],!0)===!1)return b.edit.on(),!1;var d=a.parseJSON(c);return d.link?d:(o(wa,c),!1)}catch(e){return o(ya,c),!1}}function z(c){try{var d=a(c).find("Location").text(),e=a(c).find("Key").text();return b.events.trigger("image.uploadedToS3",[d,e,c],!0)===!1?(b.edit.on(),!1):d}catch(f){return o(ya,c),!1}}function A(a){s("Loading image");var c=this.status,d=this.response,e=this.responseXML,f=this.responseText;try{if(b.opts.imageUploadToS3)if(201==c){var g=z(e);g&&x(g,!1,[],a,d||e)}else o(ya,d||e);else if(c>=200&&300>c){var h=y(f);h&&x(h.link,!1,h,a,d||f)}else o(xa,d||f)}catch(i){o(ya,d||f)}}function B(){o(ya,this.response||this.responseText||this.responseXML)}function C(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;s("Uploading",b)}}function D(c,d,e){var f,g="";if(d&&"undefined"!=typeof d)for(f in d)d.hasOwnProperty(f)&&"link"!=f&&(g+=" data-"+f+'="'+d[f]+'"');var h=b.opts.imageDefaultWidth;h&&"auto"!=h&&(""+h).indexOf("px")<0&&(""+h).indexOf("%")<0&&(h+="px");var i=a('<img class="'+(b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+g+(h?' style="width: '+h+';"':"")+">");i.on("load",e),b.edit.on(),b.events.focus(!0),b.selection.restore(),b.undo.saveStep(),b.opts.imageSplitHTML?b.markers.split():b.markers.insert();var j=b.$el.find(".fr-marker");return j.replaceWith(i),b.html.wrap(),b.selection.clear(),i}function E(){b.edit.on(),r(!0)}function F(c,d,e){function f(){var e=a(this);e.off("load"),e.addClass("fr-uploading"),e.next().is("br")&&e.next().remove(),b.placeholder.refresh(),e.is(qa)||v(e),j(),q(),b.edit.off(),c.onload=function(){A.call(c,e)},c.onerror=B,c.upload.onprogress=C,c.onabort=E,e.off("abortUpload").on("abortUpload",function(){4!=c.readyState&&c.abort()}),c.send(d)}var g,h=new FileReader;h.addEventListener("load",function(){var a=h.result;if(h.result.indexOf("svg+xml")<0){for(var c=atob(h.result.split(",")[1]),d=[],e=0;e<c.length;e++)d.push(c.charCodeAt(e));a=window.URL.createObjectURL(new Blob([new Uint8Array(d)],{type:"image/jpeg"}))}qa?(qa.on("load",f),b.edit.on(),b.undo.saveStep(),qa.data("fr-old-src",qa.attr("src")),qa.attr("src",a)):g=D(a,null,f)},!1),h.readAsDataURL(e)}function G(a){if(b.events.trigger("image.beforeUpload",[a])===!1)return!1;if("undefined"!=typeof a&&a.length>0){var c=a[0];if(c.size>b.opts.imageMaxSize)return o(za),!1;if(b.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g,""))<0)return o(Aa),!1;var d;if(b.drag_support.formdata&&(d=b.drag_support.formdata?new FormData:null),d){var e;if(b.opts.imageUploadToS3!==!1){d.append("key",b.opts.imageUploadToS3.keyStart+(new Date).getTime()+"-"+(c.name||"untitled")),d.append("success_action_status","201"),d.append("X-Requested-With","xhr"),d.append("Content-Type",c.type);for(e in b.opts.imageUploadToS3.params)b.opts.imageUploadToS3.params.hasOwnProperty(e)&&d.append(e,b.opts.imageUploadToS3.params[e])}for(e in b.opts.imageUploadParams)b.opts.imageUploadParams.hasOwnProperty(e)&&d.append(e,b.opts.imageUploadParams[e]);d.append(b.opts.imageUploadParam,c);var f=b.opts.imageUploadURL;b.opts.imageUploadToS3&&(f="https://"+b.opts.imageUploadToS3.region+".amazonaws.com/"+b.opts.imageUploadToS3.bucket);var g=b.core.getXHR(f,b.opts.imageUploadMethod);F(g,d,c)}}}function H(c){b.events.$on(c,"dragover dragenter",".fr-image-upload-layer",function(){return a(this).addClass("fr-drop"),!1}),b.events.$on(c,"dragleave dragend",".fr-image-upload-layer",function(){return a(this).removeClass("fr-drop"),!1}),b.events.$on(c,"drop",".fr-image-upload-layer",function(d){d.preventDefault(),d.stopPropagation(),a(this).removeClass("fr-drop");var e=d.originalEvent.dataTransfer;if(e&&e.files){var f=c.data("instance")||b;f.events.disableBlur(),f.image.upload(e.files),f.events.enableBlur()}}),b.events.$on(c,"change",'.fr-image-upload-layer input[type="file"]',function(){if(this.files){var d=c.data("instance")||b;d.events.disableBlur(),c.find("input:focus").blur(),d.events.enableBlur(),d.image.upload(this.files)}a(this).val("")})}function I(c){var d=c.originalEvent.dataTransfer;if(d&&d.files&&d.files.length){var e=d.files[0];if(e&&e.type&&b.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g,""))>=0){b.markers.remove(),b.markers.insertAtPoint(c.originalEvent),b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),b.popups.hideAll();var f=b.popups.get("image.insert");return f||(f=L()),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)),b.popups.show("image.insert",c.originalEvent.pageX,c.originalEvent.pageY),q(),G(d.files),c.preventDefault(),c.stopPropagation(),!1}}}function J(){var c,d,e=b.selection.ranges(0);e.collapsed&&e.startContainer.nodeType==Node.ELEMENT_NODE&&(e.startContainer.childNodes.length==e.startOffset?(c=e.startContainer.childNodes[e.startOffset-1],c&&"IMG"==c.tagName&&"block"==a(c).css("display")&&(d=b.node.blockParent(c),d&&b.html.defaultTag()?d.nextSibling||(["TD","TH"].indexOf(d.tagName)<0?a(d).after("<"+b.html.defaultTag()+"><br>"+a.FE.MARKERS+"</"+b.html.defaultTag()+">"):a(img).after("<br>"+a.FE.MARKERS),b.selection.restore()):d||(a(c).after("<br>"+a.FE.MARKERS),b.selection.restore()))):0===e.startOffset&&e.startContainer.childNodes.length>e.startOffset&&(c=e.startContainer.childNodes[e.startOffset],c&&"IMG"==c.tagName&&"block"==a(c).css("display")&&(d=b.node.blockParent(c),d&&b.html.defaultTag()?d.previousSibling||(["TD","TH"].indexOf(d.tagName)<0?a(d).before("<"+b.html.defaultTag()+"><br>"+a.FE.MARKERS+"</"+b.html.defaultTag()+">"):a(img).before("<br>"+a.FE.MARKERS),b.selection.restore()):d||(a(c).before(a.FE.MARKERS+"<br>"),b.selection.restore()))))}function K(){b.events.$on(b.$el,b._mousedown,"IMG"==b.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(c){return a(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length?!0:(b.selection.clear(),ua=!0,b.browser.msie&&(b.events.disableBlur(),b.$el.attr("contenteditable",!1)),b.draggable||c.preventDefault(),void c.stopPropagation())}),b.events.$on(b.$el,b._mouseup,"IMG"==b.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(c){return a(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length?!0:void(ua&&(ua=!1,c.stopPropagation(),b.browser.msie&&(b.$el.attr("contenteditable",!0),b.events.enableBlur())))}),b.events.on("keyup",function(c){if(c.shiftKey&&""===b.selection.text().replace(/\n/g,"")){var d=b.selection.element(),e=b.selection.endElement();d&&"IMG"==d.tagName?v(a(d)):e&&"IMG"==e.tagName&&v(a(e))}},!0),b.events.on("drop",I),b.events.on("mousedown window.mousedown",da),b.events.on("window.touchmove",ea),b.events.on("mouseup window.mouseup",function(){return qa?(ca(),!1):void 0}),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&ca()}),b.events.on("mouseup",J),b.events.on("blur image.hideResizer commands.undo commands.redo element.dropped",function(){ua=!1,ca(!0)})}function L(a){if(a)return b.popups.onRefresh("image.insert",c),b.popups.onHide("image.insert",f),!0;var d,e="";b.opts.imageInsertButtons.length>1&&(e='<div class="fr-buttons">'+b.button.buildList(b.opts.imageInsertButtons)+"</div>");var g=b.opts.imageInsertButtons.indexOf("imageUpload"),h=b.opts.imageInsertButtons.indexOf("imageByURL"),i="";g>=0&&(d=" fr-active",h>=0&&g>h&&(d=""),i='<div class="fr-image-upload-layer'+d+' fr-layer" id="fr-image-upload-layer-'+b.id+'"><strong>'+b.language.translate("Drop image")+"</strong><br>("+b.language.translate("or click")+')<div class="fr-form"><input type="file" accept="image/'+b.opts.imageAllowedTypes.join(", image/").toLowerCase()+'" tabIndex="-1"></div></div>');var j="";h>=0&&(d=" fr-active",g>=0&&h>g&&(d=""),j='<div class="fr-image-by-url-layer'+d+' fr-layer" id="fr-image-by-url-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2">'+b.language.translate("Insert")+"</button></div></div>");var k='<div class="fr-image-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-back" data-cmd="imageDismissError" tabIndex="2">OK</button></div></div>',l={buttons:e,upload_layer:i,by_url_layer:j,progress_bar:k},m=b.popups.create("image.insert",l);return b.$wp&&b.events.$on(b.$wp,"scroll",function(){qa&&b.popups.isVisible("image.insert")&&la()}),H(m),m}function M(){if(qa){var a=b.popups.get("image.alt");a.find("input").val(qa.attr("alt")||"").trigger("change")}}function N(){var c=b.popups.get("image.alt");c||(c=O()),r(),b.popups.refresh("image.alt"),b.popups.setContainer("image.alt",a(b.opts.scrollableContainer));var d=qa.offset().left+qa.width()/2,e=qa.offset().top+qa.height();b.popups.show("image.alt",d,e,qa.outerHeight())}function O(a){if(a)return b.popups.onRefresh("image.alt",M),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageAltButtons)+"</div>";var d="";d='<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="'+b.language.translate("Alternate Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,alt_layer:d},f=b.popups.create("image.alt",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-alt",function(){qa&&b.popups.isVisible("image.alt")&&N()}),f}function P(a){if(qa){var c=b.popups.get("image.alt");qa.attr("alt",a||c.find("input").val()||""),c.find("input:focus").blur(),v(qa)}}function Q(){if(qa){var a=b.popups.get("image.size");a.find('input[name="width"]').val(qa.get(0).style.width).trigger("change"),a.find('input[name="height"]').val(qa.get(0).style.height).trigger("change")}}function R(){var c=b.popups.get("image.size");c||(c=S()),r(),b.popups.refresh("image.size"),b.popups.setContainer("image.size",a(b.opts.scrollableContainer));var d=qa.offset().left+qa.width()/2,e=qa.offset().top+qa.height();b.popups.show("image.size",d,e,qa.outerHeight())}function S(a){if(a)return b.popups.onRefresh("image.size",Q),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageSizeButtons)+"</div>";var d="";d='<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'+b.id+'"><div class="fr-image-group"><div class="fr-input-line"><input type="text" name="width" placeholder="'+b.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="'+b.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,size_layer:d},f=b.popups.create("image.size",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-size",function(){qa&&b.popups.isVisible("image.size")&&R()}),f}function T(a,c){if(qa){var d=b.popups.get("image.size");qa.css("width",a||d.find('input[name="width"]').val()),qa.css("height",c||d.find('input[name="height"]').val()),d.find("input:focus").blur(),v(qa)}}function U(a){var c,d,e=b.popups.get("image.insert");if(qa||b.opts.toolbarInline)qa&&(d=qa.offset().top+qa.outerHeight());else{var f=b.$tb.find('.fr-command[data-cmd="insertImage"]');c=f.offset().left+f.outerWidth()/2,d=f.offset().top+(b.opts.toolbarBottom?10:f.outerHeight()-10)}!qa&&b.opts.toolbarInline&&(d=e.offset().top-b.helpers.getPX(e.css("margin-top")),e.hasClass("fr-above")&&(d+=e.outerHeight())),e.find(".fr-layer").removeClass("fr-active"),e.find(".fr-"+a+"-layer").addClass("fr-active"),b.popups.show("image.insert",c,d,qa?qa.outerHeight():0)}function V(a){var c=b.popups.get("image.insert");c.find(".fr-image-upload-layer").hasClass("fr-active")&&a.addClass("fr-active")}function W(a){var c=b.popups.get("image.insert");c.find(".fr-image-by-url-layer").hasClass("fr-active")&&a.addClass("fr-active")}function X(){var c;b.shared.$image_resizer?(ra=b.shared.$image_resizer,ta=b.shared.$img_overlay,b.events.on("destroy",function(){ra.removeClass("fr-active").appendTo(a("body"))},!0)):(b.shared.$image_resizer=a('<div class="fr-image-resizer"></div>'),ra=b.shared.$image_resizer,b.events.$on(ra,"mousedown",function(a){a.stopPropagation()},!0),b.opts.imageResize&&(ra.append(k("nw")+k("ne")+k("sw")+k("se")),b.shared.$img_overlay=a('<div class="fr-image-overlay"></div>'),ta=b.shared.$img_overlay,c=ra.get(0).ownerDocument,a(c).find("body").append(ta))),b.events.on("shared.destroy",function(){ra.html("").removeData().remove(),ra=null,b.opts.imageResize&&(ta.remove(),ta=null)},!0),b.helpers.isMobile()||b.events.$on(a(b.o_win),"resize",function(){qa&&!qa.hasClass("fr-uploading")?ca(!0):qa&&(j(),la(),q(!1))}),b.opts.imageResize&&(c=ra.get(0).ownerDocument,b.events.$on(ra,b._mousedown,".fr-handler",l),b.events.$on(a(c),b._mousemove,m),b.events.$on(a(c.defaultView||c.parentWindow),b._mouseup,n),b.events.$on(ta,"mouseleave",n))}function Y(c){c=c||qa,c&&b.events.trigger("image.beforeRemove",[c])!==!1&&(b.popups.hideAll(),ca(!0),c.get(0)==b.$el.get(0)?c.removeAttr("src"):("A"==c.get(0).parentNode.tagName?(b.selection.setBefore(c.get(0).parentNode)||b.selection.setAfter(c.get(0).parentNode)||c.parent().after(a.FE.MARKERS),a(c.get(0).parentNode).remove()):(b.selection.setBefore(c.get(0))||b.selection.setAfter(c.get(0))||c.after(a.FE.MARKERS),c.remove()),b.html.fillEmptyBlocks(),b.selection.restore()),b.undo.saveStep())}function Z(){if(K(),"IMG"==b.$el.get(0).tagName&&b.$el.addClass("fr-view"),b.events.$on(b.$el,b.helpers.isMobile()&&!b.helpers.isWindowsPhone()?"touchend":"click","IMG"==b.$el.get(0).tagName?null:'img:not([contenteditable="false"])',ba),b.helpers.isMobile()&&(b.events.$on(b.$el,"touchstart","IMG"==b.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(){Ea=!1}),b.events.$on(b.$el,"touchmove",function(){Ea=!0})),b.events.on("window.keydown keydown",function(c){var d=c.which;if(qa&&(d==a.FE.KEYCODE.BACKSPACE||d==a.FE.KEYCODE.DELETE))return c.preventDefault(),c.stopPropagation(),Y(),!1;if(qa&&d==a.FE.KEYCODE.ESC){var e=qa;return ca(!0),b.selection.setAfter(e.get(0)),b.selection.restore(),c.preventDefault(),!1}return qa&&!b.keys.ctrlKey(c)?(c.preventDefault(),!1):void 0},!0),b.events.$on(a(b.o_win),"keydown",function(b){var c=b.which;return qa&&c==a.FE.KEYCODE.BACKSPACE?(b.preventDefault(),!1):void 0}),b.events.$on(b.$win,"keydown",function(b){var c=b.which;qa&&qa.hasClass("fr-uploading")&&c==a.FE.KEYCODE.ESC&&qa.trigger("abortUpload")}),b.events.on("destroy",function(){qa&&qa.hasClass("fr-uploading")&&qa.trigger("abortUpload")}),b.events.on("paste.before",_),b.events.on("paste.beforeCleanup",aa),b.events.on("paste.after",$),b.events.on("html.set",h),b.events.on("html.inserted",h),h(),b.events.on("destroy",function(){Da=[]}),b.events.on("html.get",function(a){return a=a.replace(/<(img)((?:[\w\W]*?))class="([\w\W]*?)(fr-uploading|fr-error)([\w\W]*?)"((?:[\w\W]*?))>/g,"")}),b.opts.imageOutputSize){var c;b.events.on("html.beforeGet",function(){c=b.$el.get(0).querySelectorAll("img");for(var d=0;d<c.length;d++)c[d].setAttribute("width",a(c[d]).width()),c[d].setAttribute("height",a(c[d]).height())}),b.events.on("html.afterGet",function(){for(var a=0;a<c.length;a++)c[a].removeAttribute("width"),c[a].removeAttribute("height")})}b.opts.iframe&&b.events.on("image.loaded",b.size.syncIframe),b.$wp&&(i(),b.events.on("contentChanged",i)),b.events.$on(a(b.o_win),"orientationchange.image",function(){setTimeout(function(){var a=oa();a&&v(a)},0)}),p(!0),L(!0),S(!0),O(!0),b.events.on("node.remove",function(a){return"IMG"==a.get(0).tagName?(Y(a),!1):void 0})}function $(){b.opts.imagePaste?b.$el.find("img[data-fr-image-pasted]").each(function(c,d){if(b.opts.imagePasteProcess){var f=b.opts.imageDefaultWidth;f&&"auto"!=f&&(f+=b.opts.imageResizeWithPercent?"%":"px"),a(d).css("width",f),a(d).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:""))}if(0===d.src.indexOf("data:")){if(b.events.trigger("image.beforePasteUpload",[d])===!1)return!1;qa=a(d),j(),e(),la(),q(),b.edit.off();for(var g=atob(a(d).attr("src").split(",")[1]),h=[],i=0;i<g.length;i++)h.push(g.charCodeAt(i));var k=new Blob([new Uint8Array(h)],{type:"image/jpeg"});G([k]),a(d).removeAttr("data-fr-image-pasted")}else 0!==d.src.indexOf("http")?(b.selection.save(),a(d).remove(),b.selection.restore()):a(d).removeAttr("data-fr-image-pasted")}):b.$el.find("img[data-fr-image-pasted]").remove()}function _(a){if(a&&a.clipboardData&&a.clipboardData.items&&a.clipboardData.items[0]){var c=a.clipboardData.items[0].getAsFile();if(c){var d=new FileReader;return d.onload=function(a){var c=a.target.result,d=b.opts.imageDefaultWidth;d&&"auto"!=d&&(""+d).indexOf("px")<0&&(""+d).indexOf("%")<0&&(d+="px"),b.html.insert('<img data-fr-image-pasted="true" class="'+(b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+(d?' style="width: '+d+';"':"")+">"),b.events.trigger("paste.after")},d.readAsDataURL(c),!1}}}function aa(a){return a=a.replace(/<img /gi,'<img data-fr-image-pasted="true" ')}function ba(c){if(a(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length)return!0;if(c&&"touchend"==c.type&&Ea)return!0;if(c&&b.edit.isDisabled())return c.stopPropagation(),c.preventDefault(),!1;for(var d=0;d<a.FE.INSTANCES.length;d++)a.FE.INSTANCES[d]!=b&&a.FE.INSTANCES[d].events.trigger("image.hideResizer");b.toolbar.disable(),c&&(c.stopPropagation(),c.preventDefault()),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur()),b.opts.iframe&&b.size.syncIframe(),qa=a(this),ma(),j(),e(),b.selection.clear(),b.button.bulkRefresh(),b.events.trigger("video.hideResizer")}function ca(a){qa&&(fa()||a===!0)&&(b.toolbar.enable(),ra.removeClass("fr-active"),b.popups.hide("image.edit"),qa=null,ea())}function da(){Fa=!0}function ea(){Fa=!1}function fa(){return Fa}function ga(a){qa.removeClass("fr-fir fr-fil"),"left"==a?qa.addClass("fr-fil"):"right"==a&&qa.addClass("fr-fir"),j(),e()}function ha(a){qa&&(qa.hasClass("fr-fil")?a.find("> *:first").replaceWith(b.icon.create("align-left")):qa.hasClass("fr-fir")?a.find("> *:first").replaceWith(b.icon.create("align-right")):a.find("> *:first").replaceWith(b.icon.create("align-justify")))}function ia(a,b){if(qa){var c="justify";qa.hasClass("fr-fil")?c="left":qa.hasClass("fr-fir")&&(c="right"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}}function ja(a){qa.removeClass("fr-dii fr-dib"),"inline"==a?qa.addClass("fr-dii"):"block"==a&&qa.addClass("fr-dib"),j(),e()}function ka(a,b){var c="block";qa.hasClass("fr-dii")&&(c="inline"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}function la(){var c=b.popups.get("image.insert");c||(c=L()),b.popups.isVisible("image.insert")||(r(),b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)));var d=qa.offset().left+qa.width()/2,e=qa.offset().top+qa.height();b.popups.show("image.insert",d,e,qa.outerHeight())}function ma(){if(qa){b.selection.clear();var a=b.doc.createRange();a.selectNode(qa.get(0));var c=b.selection.get();c.addRange(a)}}function na(){qa?(a(".fr-popup input:focus").blur(),v(qa)):(b.events.disableBlur(),b.selection.restore(),b.events.enableBlur(),b.popups.hide("image.insert"),b.toolbar.showInline())}function oa(){return qa}function pa(a,c,d){if("undefined"==typeof c&&(c=b.opts.imageStyles),"undefined"==typeof d&&(d=b.opts.imageMultipleStyles),!qa)return!1;if(!d){var e=Object.keys(c);e.splice(e.indexOf(a),1),qa.removeClass(e.join(" "))}qa.toggleClass(a),v(qa)}var qa,ra,sa,ta,ua=!1,va=1,wa=2,xa=3,ya=4,za=5,Aa=6,Ba=7,Ca={};Ca[va]="Image cannot be loaded from the passed link.",Ca[wa]="No link in upload response.",Ca[xa]="Error during file upload.",Ca[ya]="Parsing response failed.",Ca[za]="File is too large.",Ca[Aa]="Image file type is invalid.",Ca[Ba]="Files can be uploaded only to same domain in IE 8 and IE 9.";var Da,Ea,Fa=!1;return{_init:Z,showInsertPopup:d,showLayer:U,refreshUploadButton:V,refreshByURLButton:W,upload:G,insertByURL:u,align:ga,refreshAlign:ha,refreshAlignOnShow:ia,display:ja,refreshDisplayOnShow:ka,replace:la,back:na,get:oa,insert:x,showProgressBar:q,remove:Y,hideProgressBar:r,applyStyle:pa,showAltPopup:N,showSizePopup:R,setAlt:P,setSize:T,exitEdit:ca,edit:v}},a.FE.DefineIcon("insertImage",{NAME:"image"}),a.FE.RegisterShortcut(a.FE.KEYCODE.P,"insertImage",null,"P"),a.FE.RegisterCommand("insertImage",{title:"Insert Image",undo:!1,focus:!0,refreshAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("image.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("image.insert")):this.image.showInsertPopup()},plugin:"image"}),a.FE.DefineIcon("imageUpload",{NAME:"upload"}),a.FE.RegisterCommand("imageUpload",{title:"Upload Image",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-upload")},refresh:function(a){this.image.refreshUploadButton(a)}}),a.FE.DefineIcon("imageByURL",{NAME:"link"}),a.FE.RegisterCommand("imageByURL",{title:"By URL",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-by-url")},refresh:function(a){this.image.refreshByURLButton(a)}}),a.FE.RegisterCommand("imageInsertByURL",{title:"Insert Image",undo:!0,refreshAfterCallback:!1,callback:function(){this.image.insertByURL()},refresh:function(a){var b=this.image.get();b?a.text(this.language.translate("Replace")):a.text(this.language.translate("Insert"))}}),a.FE.DefineIcon("imageDisplay",{NAME:"star"}),a.FE.RegisterCommand("imageDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(a,b){this.image.display(b)},refresh:function(a){this.opts.imageTextNear||a.addClass("fr-hidden")},refreshOnShow:function(a,b){this.image.refreshDisplayOnShow(a,b)}}),a.FE.DefineIcon("imageAlign",{NAME:"align-center"}),a.FE.RegisterCommand("imageAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FE.COMMANDS.imageAlign.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li><a class="fr-command fr-title" data-cmd="imageAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+"</a></li>");return b+="</ul>"},callback:function(a,b){this.image.align(b)},refresh:function(a){this.image.refreshAlign(a);
},refreshOnShow:function(a,b){this.image.refreshAlignOnShow(a,b)}}),a.FE.DefineIcon("imageReplace",{NAME:"exchange"}),a.FE.RegisterCommand("imageReplace",{title:"Replace",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.image.replace()}}),a.FE.DefineIcon("imageRemove",{NAME:"trash"}),a.FE.RegisterCommand("imageRemove",{title:"Remove",callback:function(){this.image.remove()}}),a.FE.DefineIcon("imageBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("imageBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.image.back()},refresh:function(a){var b=this.image.get();b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FE.RegisterCommand("imageDismissError",{title:"OK",undo:!1,callback:function(){this.image.hideProgressBar(!0)}}),a.FE.DefineIcon("imageStyle",{NAME:"magic"}),a.FE.RegisterCommand("imageStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.imageStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li><a class="fr-command" data-cmd="imageStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},callback:function(a,b){this.image.applyStyle(b)},refreshOnShow:function(b,c){var d=this.image.get();d&&c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",d.hasClass(b))})}}),a.FE.DefineIcon("imageAlt",{NAME:"info"}),a.FE.RegisterCommand("imageAlt",{undo:!1,focus:!1,title:"Alternate Text",callback:function(){this.image.showAltPopup()}}),a.FE.RegisterCommand("imageSetAlt",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setAlt()}}),a.FE.DefineIcon("imageSize",{NAME:"arrows-alt"}),a.FE.RegisterCommand("imageSize",{undo:!1,focus:!1,title:"Change Size",callback:function(){this.image.showSizePopup()}}),a.FE.RegisterCommand("imageSetSize",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setSize()}})});
