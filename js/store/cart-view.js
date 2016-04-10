var Cart_View = (function(){

	function _loadCartView(callback) {

		return function(e){
			$('#main-wrapper').load('views/store/cart.php');

			if(callback){
				callback();
			}
		}
		
	}

	function _loadStoreView() {
		$('#main-wrapper').load('store.php .product-list');
	}

	// function _removeFromCart(){

	// 	var self = this;

	// 	vex.dialog.confirm({
	// 		message: "Are you sure?",
	// 		callback: _removeFromDb
	// 	});

	// 	function _removeFromDb(conf){
	// 		if(conf) {
	// 			var data = {
	// 				id: +$(self).closest('.cart-item').data('order-id')
	// 			}
				
	// 			$.ajax({
	// 				type: 'POST',
	// 				url: 'php_scripts/db/remove_cart_item.php',
	// 				data: data,
	// 				dataType: 'json'
	// 			}).done(function(data){
	// 				if(data.success){
	// 					(_loadCartView())();
	// 				}
	// 			});	
	// 		}
			
	// 	};
		
	// }

	function _closeDropNav(){
		$('#drop-navigation').toggleClass('nav-expanded');
	}

	function addEventListeners(){
		$('.store-controls').on('click', '.my-cart', _loadCartView());
		$('#drop-navigation').on('click', '.drop-cart', _loadCartView(_closeDropNav));
		$('#main-wrapper').on('click', '.btn-back-to-store', _loadStoreView);
			// .on('click', '.remove-from-cart', _removeFromCart);
	}

	return {
		init: addEventListeners
	}

}());

Cart_View.init();