$(function(){

	var App = (function(){

		function init(){
			// _animsition();
			_addEventListeners();

			console.info('The app is ready!');
		}

		function _addEventListeners(){
			$('#nav-toggle-box').click(_expandMenu);
			// No jumping back to the previously scrolled position
      $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
      });
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


