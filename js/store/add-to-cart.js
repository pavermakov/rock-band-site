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
				vex.close();
				_showNotification(props);
			}
		});
	}

	function _showNotification(props) {

		$.growl({ 
			title: "<i class='fa fa-shopping-cart'></i> New item added", 
			message: props.amount + " x " + props.name,
			location: 'br',
			size: 'large'
		});
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

	function addEventListeners($button) {		
		$button.click(_isUserOnline);
	}

	return {
		init: addEventListeners
	}
}());