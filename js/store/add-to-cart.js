var Add_to_cart = (function(){

	var _productProperties;

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
				_showNotification();
			}
		});
	}

	function _showNotification() {
		vex.dialog.alert({
			message: "<i class='fa fa-shopping-cart'></i> New Item Added!"
		});
	}

	function _getProductProperties() {

		var props = {
			id: $('.vex-dialog-message.selected-product-name').data('id'),
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
			amount: props.amount,
			price: props.calcTotalPrice(),
			size: props.size,
			status: props.status
		}
	}

	function _requestSignIn(){
		$('.my-sign-in').click();
	}

	function addEventListeners($button) {		
		$button.click(_isUserOnline);
	}

	return {
		init: addEventListeners
	}
}());