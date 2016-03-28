var Cart = (function(){

	function _loadCartView() {
		console.info('Loading cart!');
		$('#main-wrapper').load('views/store/cart.php');
	}

	function _loadStoreView() {
		console.info('Loading store');
		$('#main-wrapper').load('store.php .product-list');
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
					id: +$(self).closest('.cart-item').data('order-id')
				}
				
				$.ajax({
					type: 'POST',
					url: 'php_scripts/db/remove_cart_item.php',
					data: data,
					dataType: 'json'
				}).done(function(data){
					if(data.success){
						_loadCartView();
					}
				});	
			}
			
		};
		
	}

	function addEventListeners(){
		$('.store-controls').on('click', '.my-cart', _loadCartView);
		$('#main-wrapper')
			.on('click', '.back-to-store', _loadStoreView)
			.on('click', '.remove-from-cart', _removeFromCart);
	}

	return {
		init: addEventListeners
	}

}());

Cart.init();