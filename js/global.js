// list all functions in one easy to find place
$(function() { 
	clearSearch();
	googleTracker();
	$(document).bind('emchange', equalHeights); // do it again when text is resized
	$(window).load(equalHeights);
});

   
// 1. Clear search
function clearSearch() {
	$('#q').focus(function(){
	if(this.value=='Search')
	{
	this.value=' '
	}
	});
}



// 2. google tracker
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

// 3. equal heights
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

// 1. Equal Heights Plugin
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

