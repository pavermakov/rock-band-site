var Sign_out = (function(){

	function _signOut() {
		console.log('Signing out');
		$.ajax({
			type: 'POST',
			url: 'php_scripts/misc/sign_out.php'
		}).done(function(){
			$('.store-controls').load('store.php .controls');
			$('#main-wrapper').load('store.php .product-list');
			$.growl({ 
				title: "<i class='fa fa-sign-out'></i> Now signed out", 
				message: "Goodbye!",
				location: 'br',
				size: 'large'
			});
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