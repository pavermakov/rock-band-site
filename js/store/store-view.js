var Store_View = (function(){

	var $main_wrapper = $('#main-wrapper');

	function loadCartView(callback) {

		return function(e){
			$main_wrapper.load('views/store/cart.php');

			if(callback){
				callback();
			}
		}
		
	}

	function loadAddressFormView() {
		$main_wrapper.load('views/store/address_form.php')
	}

	function loadStoreView() {
		$main_wrapper.load('store.php .product-list');
	}

	function _closeDropNav(){
		$('#drop-navigation').toggleClass('nav-expanded');
	}

	function addEventListeners(){
		$('.store-controls').on('click', '.my-cart', loadCartView());
		$('#drop-navigation').on('click', '.drop-cart', loadCartView(_closeDropNav));
		$main_wrapper.on('click', '.btn-back-to-store', loadStoreView);
		$main_wrapper.on('click', '.btn-back-to-cart', loadCartView());
		$main_wrapper.on('click', '.btn-checkout', loadAddressFormView)
	}

	return {
		init: addEventListeners,
		loadCart: loadCartView,
		loadStore: loadStoreView
	}

}());

Store_View.init();