var Sign_up = (function(){

	var _inputs = {
		email: "<input name='email' type='email' placeholder='E-mail' />",
		password: "<input name='password' type='password' placeholder='Password' />",
		conf_pass: "<input name='conf_pass' type='password' placeholder='Confirm Password' />",
		signIn: "<div class='emergency'>Already registered? <div class='emergency-btn e-sign-in'>Sign&nbsp;in</div></div>"
	};

	var _validationObj = {
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5,
				equalTo: "input[name='conf_pass']"
			},
			conf_pass: {
				required: true,
				minlength: 5,
				equalTo: "input[name='password']"
			}
		}
	};

	function _concatInputs() {
		return _inputs.email + "\n" + _inputs.password + "\n" + _inputs.conf_pass + "\n" + _inputs.signIn;
	}

	function _openSignUpModal() {
		console.log('Signing up');

		function _emergencyEventListener(dialog) {
			$('.e-sign-in').click(_openSignIn(dialog));
		}

		vex.dialog.open({
			message: "Sign Up",
			input: _concatInputs(),
			buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Sign Up'
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
        // ajax form submition goes here

        var formData = {
        	'email': $('input[name=email]').val(),
        	'password': $('input[name=password]').val(),
        	'conf_pass': $('input[name=conf_pass]').val()
        };

        $.ajax({
        	type: 'POST',
        	url: 'php_scripts/db/validate_sign_up.php',
        	data: formData,
        	dataType: 'json'
        }).done(function(data){

        	if(data.errors){
        		if(data.errors.already_exists){
        			vex.dialog.alert('Email already exists!');
        		}
        	} else {
        		console.log("Adding new user");
        		$.ajax({
        			type: 'POST',
        			url: 'php_scripts/db/add_new_user.php',
        			data: formData,
        			dataType: 'json'
        		}).done(function(data){
        			vex.close();
      				$('.store-controls').load('store.php .controls');
        		});
        	}

        });

      }
		});

		
	}

	function _openSignIn(dialog){
		return function(e){
			vex.close(dialog.$vexContent);
			$('.my-sign-in').click();
		}
		
	}

	function addEventListeners() {
		$('.store-controls').on('click', '.my-sign-up',_openSignUpModal);
	}

	return {
		init: addEventListeners
	}

}());

Sign_up.init();