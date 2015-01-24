// list all functions in one easy to find place
$(function() { 
	insertLinks();
	switchCSS();
	toggleTextSize();
	clearSearch();
	googleTracker();
	$(document).bind('emchange', equalHeights); // do it again when text is resized
	$(window).load(equalHeights);
});

   

// 1. insert links
// needs full path otherwise does not work in subdirectories.
function insertLinks() {
    $("form.searchForm").before ('<ul class="switcher"><li class="blue"><a href="#" rel="/_assets/css/blue.css" title="Default colour scheme"><span>blue</span></a></li><li class="contrast"><a href="#" rel="/_assets/css/contrast.css" title="High contrast colour scheme"><span>contrast</span></a></li></ul><ul><li class="textSwap"><a href="#?ToggleText" class="textSwap" title="Toggle text size"><span>Toggle</span></a></li></ul>');
}


// 2. switch css
function switchCSS() {
    if($.cookie("css")) {
        $("link.switchcss").attr("href",$.cookie("css"));
    }
    $(".switcher li a").click(function() {
        $("link.switchcss").attr("href",$(this).attr('rel'));
        $.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
        return false;
    });

}



// 3. Toggle text size
function toggleTextSize() {
	// set cookies
	if($.cookie("textSizeClass")) {
	 $("body").attr("class",$.cookie("textSizeClass"));
	 }
    // toggle body class
    $("a.textSwap").click(function () {
	 $("body").toggleClass("largeText");
	 //read cookie
	 $.cookie("textSizeClass",$("body").attr("class"), {expires: 365, path: '/'});
	 return false;
    });
}

// 4. Clear search
function clearSearch() {
	$('#q').focus(function(){
	if(this.value=='Search')
	{
	this.value=' '
	}
	});
}



// 6. google tracker
// from http://www.carronmedia.com/extend-google-analytics-with-jquery/
function googleTracker(){
	    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	    $.getScript(gaJsHost + "google-analytics.com/ga.js", function(){
	 
	        try {
	            var pageTracker = _gat._getTracker("UA-3783137-2");
					// UA-3783137-1 = stfrancisrcsheffield
					// UA-3783137-2 = stfrancisrc-sheffield
					// UA-3783137-3 = stfrancisrc-sheffield/testbed

	            pageTracker._trackPageview();
	        } catch(err) {}
	 
	        var filetypes = /\.(zip|exe|pdf*|doc*|docx*|xls*|ppt*|mp3)$/i;
	 
	       $('a[href]').each(function(){
	            var href = $(this).attr('href');
	 
	            if ((href.match(/^https?\:/i)) && (!href.match(document.domain))){
					     $(this).click(function() {
	                   var extLink = href.replace(/^https?\:\/\//i, '');
							 pageTracker._trackEvent('External', 'Click', extLink);
	                });
	            }
	            else if (href.match(/^mailto\:/i)){
	                $(this).click(function() {
	                    var mailLink = href.replace(/^mailto\:/i, '');
	                    pageTracker._trackEvent('Email', 'Click', mailLink);
	                });
	            }
	            else if (href.match(filetypes)){
	                $(this).click(function() {
	                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
	                    var filePath = href.replace(/^https?\:\/\/(www.)stfrancisrc\-sheffield\.org\.uk\/testbed\//i, '');
	                    pageTracker._trackEvent('Download', 'Click - ' + extension, filePath);
	                });
	            }
	        });
	    });
}

// 7. equal heights
function equalHeights() {	
/**
* Thanks to RCKT for this script
* We look for matching class names, ending with an ascending index
* e.g. all elements with the class equalHeight1 will have their heights matched,
* then all elements with the class equalHeight2, etc.
* All class names must begin with the keyword defined - but they can have any ending.
* @return int The number of height groups found
*/
	var _keyword = 'equalHeight';	
	// Get a collection of all elements with a class which talk about equalHeight
	var _uniqueIndexes = {};
	$('[class*= '+_keyword+']').each(function() {
							// Go through each element, and look at it's class names	
							var _classes = this.className.split(' ');
							$.each(_classes, function() {
							// If one of the class names begins with the keyword, add it to the list of unique indexes		  
											if (this.toString().substr(0, _keyword.length) == _keyword) {
												_uniqueIndexes[this.toString()] = true;
												}														  
											});
							 });
	// Now we have our object of unique classes, let's make them into a jQuery collection and equalise them
	$.each(_uniqueIndexes, function(theClass) {
				$('.'+theClass).equaliseCols();
				 });
	return _uniqueIndexes.length
}



/* ***************************** 
PLUGINS 
***************************** */


// 1. use cookie plug-in
//http://plugins.jquery.com/files/jquery.cookie.js.txt

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); 
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


// 2. Equal Heights Plugin
/*
 * Column equalisation (renamed for the UK)
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */ 
(function($) {	 
	$.fn.equaliseCols = function(){
		var height = 0,
			reset = $.browser.msie ? "1%" : "auto";
  
		return this
			.css("height", reset)
			.each(function() {
				height = Math.max(height, this.offsetHeight);
			})
			.css("height", height)
			.each(function() {
				var h = this.offsetHeight;
				if (h > height) {
					$(this).css("height", height - (h - height));
				};
			});
			
	};
	
})(jQuery);

// 3. text resize plugin
// jQEm v0.2: http://davecardwell.co.uk/javascript/jquery/plugins/jquery-em/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(c/a))+String.fromCharCode(c%a+161)};while(c--){if(k[c]){p=p.replace(new RegExp(e(c),'g'),k[c])}}return p}('× ¢(){¿ ¾={\'²\':¢(»){£ »!=¤?¡.²=»:¡.²},\'¬\':¢(){£ ¡.¬()},\'«\':¢(¥){£ ¡.«(¥)},\'¯\':¢(¥){£ ¡.¯(¥)},\'¨\':¢(­,¶){£ ¡.¨(­,¶)},\'ª\':¢(){£ ¡.ª},\'³\':¢(¸){£ ¸?¡.³=¸:¡.³},\'©\':¢(){£ ¡.©()},\'°\':¢(){£ ¡.°()},\'§\':¢(){£ ¡.§},\'±\':¢(){£ ¡.±}};$.Ã=¾;¿ ¡={\'e\':$(Á.Ç(\'i\')),\'ª\':·,\'´\':¤,\'§\':¤,\'³\':È,\'½\':¤,\'±\':¤,\'²\':Å,\'¬\':¬,\'«\':«,\'¯\':¯,\'¨\':¨,\'º\':¢(){¡.¨(·);£\'¼\'},\'©\':©,\'°\':°};$(Á).É(¢(){¦(¡.²)¬()});¢ ¬(){$(\'Ê\').Ë(¡.e.Ì({\'Í\':\'Î\',\'Ï\':\'-¼\',\'Ð\':\'Ñ\',\'Ó\':\'Ô\',\'®\':\'¼\'}));¡.´=(¡.e.µ!=¤&&¡.e.µ.Â!=¤);¡.©()};¢ «(¥){¡.e.«(\'¹\',¥)};¢ ¯(¥){¡.e.¯(\'¹\',¥)};¢ ¨(­,¶){¦(­==¤)­=·;¦(­||¡.e.®()!=¡.§){¡.±=¡.§;¡.§=¡.e.®();$.Æ.¨(\'¹\',¶)}};¢ ©(){¦(¡.ª)£;¡.§=¡.±=¡.e.®();¦(¡.´){¡.e.µ.Â(\'®\',\'$.Ã.º();\')}À{¡.½=Ä.Ò(¡.º,¡.³)}¡.ª=Å};¢ °(){¦(!¡.ª)£;¦(¡.´){¡.e.µ.Õ(\'®\')}À{Ä.Ö(¡.½)}}}();',55,55,'Private|function|return|undefined|callback|if|current|trigger|start|active|bind|init|force|width|unbind|stop|previous|auto|delay|canExp|style|args|false|milliseconds|emchange|update|bool|1em|iid|Public|var|else|document|setExpression|jqem|window|true|event|createElement|100|ready|body|prepend|css|display|block|left|position|absolute|setInterval|visibility|hidden|removeExpression|removeInterval|new'.split('|')))

