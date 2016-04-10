$(function(){

	var App = (function(){

		function init(){
			// _animsition();
			_addEventListeners();

			console.info('The app is ready!');
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


