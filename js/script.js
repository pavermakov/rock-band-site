$(function(){

	var App = (function(){

		function init(){
			// _animsition();
			_addEventListeners();

			console.info('The app is ready!');
		}

		function _animsition(){
			$(".animsition").animsition({
				inClass: 'fade-in',
		    outClass: 'fade-out',
		    inDuration: 400,
		    outDuration: 400,
		    linkElement: '.animsition-link',
		    // e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
		    loading: true,
		    loadingParentElement: 'body', //animsition wrapper element
		    loadingClass: 'animsition-loading',
		    loadingInner: '', // e.g '<img src="loading.svg" />'
		    timeout: false,
		    timeoutCountdown: 5000,
		    onLoadEvent: true,
		    browser: [ 'animation-duration', '-webkit-animation-duration'],
		    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
		    overlay : false,
		    overlayClass : 'animsition-overlay-slide',
		    overlayParentElement : 'body',
		    transition: function(url){ window.location.href = url}
			});
		}

		function _addEventListeners(){
			$('#nav-toggle-box').click(_expandMenu);
		}

		function _expandMenu(){
			$('#drop-navigation').toggleClass('nav-expanded');
		}

		return {
			init: init
		}

	}());

	App.init();

});


