var Cart = (function(){

	function _loadMyCart() {
		console.log('Loading cart!');
		$('#main-wrapper').load('views/store/cart.php');
	}

	function _loadStore() {
		console.log('');
		$('#main-wrapper').load('store.php .product-list');
	}

	function addEventListeners(){
		$('.store-controls').on('click', '.my-cart', _loadMyCart);
		$('#main-wrapper').on('click', '.back-to-store', _loadStore);
	}

	return {
		init: addEventListeners
	}

}());

Cart.init();