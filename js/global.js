// list all functions in one easy to find place
$(function() { 
	clearSearch();
	googleTracker();
	addJS();
	mobileNav();
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


// addJS
function addJS() {
	$('body').addClass('has-js').removeClass('no-js');
	// allow specific styling for with JS, without JS and don't know JS
};

function mobileNav(){
	$("#menu").insertAfter(".mobileOnly"); //move menu up to top of page
    $(".mobileOnly").click(function(){
        $("nav ul").toggleClass("openMobileNav");
		});
	}

/*****************
TO DO

Add aria states as used here: http://heydonworks.com/practical_aria_examples/#hamburger to make hamburger 
keyboard and screen reader accessible


*****************/

