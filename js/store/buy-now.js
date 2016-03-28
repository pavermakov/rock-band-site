var Buy_now = (function(){

	function _isUserOnline() {
		console.log('buying');
		// check if user logged in
		$.ajax({
			type: 'GET',
			url: 'php_scripts/misc/session_checker.php',
			dataType: 'json'
		}).done(function(data){
			if(data.success){
				console.log('The user is in the system!');
			} else {
				console.log('The user is NOT in the system!');
				requestSignIn();
			}
		});
	}

	function requestSignIn(){
		$('.my-sign-in').click();
	}

	function addEventListeners($button) {		
		$button.click(_isUserOnline);
	}

	return {
		init: addEventListeners
	}

}());