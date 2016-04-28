var Store_Action = (function(Store_View, Utilities){

	var _productProperties;
	var _userInfo = {};
	var _addressValidation = {
		rules: {
			first_name: {
				required: true,
				minlength: 2
			},
			last_name: {
				required: true,
				minlength: 2
			},
			address: {
				required: true,
				minlength: 2
			},
			city: {
				required: true,
				minlength: 2
			},
			province: {
				required: true,
				minlength: 2
			},
			country: {	
				required: true,
				minlength: 2
			},
			zip: {
				required: true,
				minlength: 4,
				maxlength: 10,
				digits: true
			}

		},
		errorPlacement: function(error,element) {
	    return true;
	  }
	};

	function _isUserOnline(){
		console.info('checking if user online');

		$.ajax({
			type: 'GET',
			url: 'php_scripts/misc/session_checker.php',
			dataType: 'json'
		}).done(function(data){
			if(!data.success) {
				_requestSignIn();
			} else {
				_addToCart(_getProductProperties());
			}
		});
	}

	function _addToCart(props){
		$.ajax({
			type: 'POST',
			url: 'php_scripts/db/add_to_cart.php',
			data: props,
			dataType: 'json'
		}).done(function(data){
			if(data.success) {
				console.log('Successfully added to cart');
				vex.close();
				_showNotification(props);
			}
		});
	}

	function _removeFromCart(){

		var self = this;

		vex.dialog.confirm({
			message: "Are you sure?",
			callback: _removeFromDb
		});

		function _removeFromDb(conf){
			if(conf) {
				var data = {
					id: +$(self).data('order-id')
				}
				
				$.ajax({
					type: 'POST',
					url: 'php_scripts/db/remove_cart_item.php',
					data: data,
					dataType: 'json'
				}).done(function(data){
					if(data.success){
						(Store_View.loadCart())();
					}
				});	
			}
			
		};
		
	}

	function _validateAddressForm() {

		var $form = $('.shipping-form');
		var $errorField = $('.error-field');

		function __displayErrors(){
			$errorField.addClass('visible');
			if($errorField.hasClass('hidden')){
				$errorField.removeClass('hidden');
			}
		}

		function __hideErrors(){
			if($errorField.hasClass('visible')){
				$errorField.removeClass('visible');
				$errorField.addClass('hidden');
			}
		}

		
		$form.validate(_addressValidation);
		$form.submit();

		if($form.valid()){
			__hideErrors();
			return true;
		} else {
			__displayErrors();
			return false;
		}

	}

	function _submitAddressForm(event){
		// I use ajax to submit the shipping form to
		// the server

		function __getUserInfo(){
			// get new user data from the form fields
			var user = {
				first_name: $('input[name="first_name"]').val(),
				last_name: $('input[name="last_name"]').val(),
				address: $('input[name="address"]').val(),
				city: $('input[name="city"]').val(),
				province: $('input[name="province"]').val(),
				country: $('input[name="country"]').val(),
				zip: $('input[name="zip"]').val()
			}

			return user;
		}

		if(_validateAddressForm()){
			console.log('form is valid')
			_updateUserInfo(__getUserInfo());
		}
		
	}

	function _preventFromSubmitting(event){
		// I don't want this form to be submitted synchroniusly
		// I will do it later via $.ajax
		event.stopPropagation();  
	  event.preventDefault();
	}

	function _updateUserInfo(userInfo){
		// if the user is entering information for the first time,
		// ir will be saved in the db. Otherewise, if the user is 
		// modifying the existing data, it will be overridden and 
		// updated in the database.

		function __handleUserUpdate(data){
			if(data.success){
				// load review screen
				// or update show the notification
				if($('#account').html()){
					Utilities.notify(
						'<i class="fa fa-check" aria-hidden="true"></i> Success', 
						'User information was successfully updated!'
					);
				} else {
					Store_View.loadReview();
				}
				
			}
		}

		$.ajax({
			type: 'POST',
			url: 'php_scripts/db/update_user_info.php',
			data: userInfo,
			dataType: 'json'
		}).done(__handleUserUpdate);
	}

	function _showNotification(props) {

		function _getFullSize(size){

			if(!size){
				return '';
			}

			var fullSize;

			switch (size){
				case 'XS':
					fullSize = 'Extra Small';
					break;
				case 'S':
					fullSize = 'Small';
					break;
				case 'M':
					fullSize = 'Medium';
					break;
				case 'L':
					fullSize = 'Large';
					break;
				case 'XL':
					fullSize = 'Extra Large';
					break;
			}

			return fullSize;
		}

		function _getItem(item){
			if(+item === 1){
				return "item";
			} else {
				return "items";
			}
		}

		_getItem(props.amount);

		Utilities.notify(
			"<i class='fa fa-shopping-cart'></i> New " + _getItem(props.amount) + " added",
			props.amount + " x " + _getFullSize(props.size) + " " + props.name
		);
	}

	function _getProductProperties() {

		var props = {
			id: $('.vex-dialog-message.selected-product-name').data('id'),
			name: $('.vex-dialog-message.selected-product-name').html(),
			amount: $('.total-quantity').html(),
			price: $('.product-modal-price').data('price'),
			size: $('.product-sizes .selected-size').html(),
			status: "in cart",
			calcTotalPrice: function() {
				return this.price * this.amount;
			}
		}

		return {
			id: props.id,
			name: props.name,
			amount: props.amount,
			price: props.calcTotalPrice(),
			size: props.size,
			status: props.status
		}
	}

	function _requestSignIn(){
		$('.my-sign-in').click();
	}

	function addEventListenersToCart() {	
		var $main_wrapper = $('#main-wrapper');
		$main_wrapper.on('click', '#remove-item', _removeFromCart);
		$main_wrapper.on('click', '.btn-update-user', {callback: 'true'}, _submitAddressForm);
		$main_wrapper.on('click', '.btn-review-order', _submitAddressForm);
		$main_wrapper.on('submit', '.shipping-form', _preventFromSubmitting);
	}

	function addEventListeners($button){
		// activated if user is trying to add product to the cart
		$button.click(_isUserOnline);
	}

	return {
		init: addEventListeners,
		listen: addEventListenersToCart
	}
}(Store_View, Utilities));

Store_Action.listen();

