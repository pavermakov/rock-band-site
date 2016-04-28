var Sign_out = (function(Utilities){

	function _signOut(callback) {

		return function(e){
			$.ajax({
				type: 'POST',
				url: 'php_scripts/misc/sign_out.php'
			}).done(function(){
				
				_loadViews();

				Utilities.notify(
					"<i class='fa fa-sign-out'></i> Now signed out",
					"Goodbye!"
				);

			});

			if(callback){
				callback();
			}
		}
		
	}

	function _loadViews(){
		$('.store-controls').load('store.php .controls');
		$('#main-wrapper').load('store.php .product-list');
		$('.drop-controls-wrapper').load('store.php .drop-controls');
	}

	function _closeDropNav(){
		$('#drop-navigation').toggleClass('nav-expanded');
	}

	function addEventListeners() {
		$('.store-controls').on('click', '.my-sign-out', _signOut());
		$('#drop-navigation').on('click', '.drop-sign-out', _signOut(_closeDropNav));
	}

	return {
		init: addEventListeners
	}
}(Utilities));

Sign_out.init();