var Utilities = (function(){

	function showLoader(container,color){
		container.html('<div class="'+color+'-loader"><div class="loader"></div></div>');
		return this;
	}

	function disableElement(element) {
		element.attr("disabled", "true");
		return this;
	}

	function enableElement(element){
		element.removeAttr("disabled");
		return this;
	}

	function clearElement(element) {
		element.html('');
		return this;
	}

	function showNotification(title, message, location, size){
		_title = title || 'Growl title';
		_message = message || 'Growl message',
		_location = location || 'bl',
		_size = size || 'large';

		$.growl({
			title: _title,
			message: _message,
			location: _location,
			size: _size
		});

		return this;
	}

	function scrollToTop(speed){
		speed = speed || "fast";
		$("html, body").animate({ scrollTop: 0 }, speed);
  	return false;
	}

	function cancelScrolling(){
		$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(e){
      if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove"){
        $("html,body").stop();
      }
    });
	}

	return {
		loading: showLoader,
		disable: disableElement,
		enable: enableElement,
		empty: clearElement,
		notify: showNotification,
		scrollTop: scrollToTop,
		cancelScroll: cancelScrolling
	}

}());