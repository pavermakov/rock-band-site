var Sign_out = (function(){

	function _signOut() {
		console.log('Signing out');
		$.ajax({
			type: 'POST',
			url: 'php_scripts/misc/sign_out.php'
		}).done(function(){
			$('.store-controls').load('store.php .controls');
		});
	}

	function addEventListeners() {
		$('.store-controls').on('click', '.my-sign-out', _signOut);
	}

	return {
		init: addEventListeners
	}
}());

Sign_out.init();