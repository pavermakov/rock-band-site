var Sign_in = (function(){

	var _inputs = {
		email: "<input name='email' type='email' placeholder='E-mail' />",
		password: "<input name='password' type='password' placeholder='Password' />",
		signUp: "<div class='emergency'>No account? <div class='emergency-btn e-sign-up'>Sign&nbsp;up</div></div>"
	};

	var _validationObj = {
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		}
	};

	function _concatInputs(){
		return _inputs.email + "\n" + _inputs.password + "\n" + _inputs.signUp;
	}

	function _openSignInModal() {
		console.log('Signing in');

		function _emergencyEventListener(dialog) {
			$('.e-sign-up').click(_openSignUp(dialog));
		}

		vex.dialog.open({
			message: "Sign in",
			input: _concatInputs(),
			buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Sign In'
		    }), $.extend({}, vex.dialog.buttons.NO, {
		      text: 'Back'
		    })
		  ],
		  afterOpen: function() {
		  	$(".vex-dialog-form").validate(_validationObj);
		  	_emergencyEventListener($(this));
		  },
		  onSubmit: function(event) {
		  	event.stopPropagation();  
        event.preventDefault();

        var formData = {
        	'email': $('input[name=email]').val(),
        	'password': $('input[name=password]').val()
        };

        $.ajax({
        	type: 'POST',
        	url: 'php_scripts/db/sign_in.php',
        	data: formData,
        	dataType: 'json'
        }).done(function(data){
        	// handle request here
        	console.log(data);
        	if(data.errors){
        		if(data.errors.not_exist){
        			vex.dialog.alert('No such user!');
        		} else if(data.errors.wrong_pass) {
        			vex.dialog.alert('Wrong password!');
        		}
        	} else {
        		vex.close();
      			$('.store-controls').load('store.php .controls');
        	}
        })
		  }
		});
	}

	function _openSignUp(dialog){
		return function(e){
			vex.close(dialog.$vexContent);
			$('.my-sign-up').click();
		}
		
	}

	function addEventListeners() {
		$('.store-controls').on('click', '.my-sign-in', _openSignInModal);
	}

	return {
		init: addEventListeners
	}

}());

Sign_in.init();