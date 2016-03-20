var Sign_up = (function(){

	var _inputs = {
		email: "<input name='email' type='email' placeholder='E-mail' />",
		password: "<input name='password' type='password' placeholder='Password' />",
		conf_pass: "<input name='conf_pass' type='password' placeholder='Confirm Password' />"
	};

	var _validateionObj = {
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			conf_pass: {
				required: true,
				minlength: 5,
				equalTo: "input[name='password']"
			}
		}
	};

	function _concatInputs() {
		return _inputs.email + "\n" + _inputs.password + "\n" + _inputs.conf_pass;
	}

	function _openSignUpModal() {

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
		  	$(".vex-dialog-form").validate(_validateionObj);
		  },
		  onSubmit: function(event) {
        event.stopPropagation();  
        event.preventDefault();
        // ajax form submition goes here

        var formData = {
        	'email': $('input[name=email]').val(),
        	'password': $('input[name=password]').val(),
        	'conf_pass': $('input[name=conf_pass]').val()
        }

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

	function addEventListeners() {
		$('.store-controls').on('click', '.my-sign-up',_openSignUpModal);
	}

	return {
		init: addEventListeners
	}

}());

Sign_up.init();