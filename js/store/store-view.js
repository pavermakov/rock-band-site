var Store_View = (function(){

	var $main_wrapper = $('#main-wrapper'),
			$drop_navigation = $('#drop-navigation');

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

	function loadReviewOrderView(){
		$main_wrapper.load('views/store/review_order.php');
	}

	function _closeDropNav(){
		$drop_navigation.toggleClass('nav-expanded');
	}

	function addEventListeners(){
		$('.store-controls').on('click', '.my-cart', loadCartView());
		$drop_navigation.on('click', '.drop-cart', loadCartView(_closeDropNav));
		$main_wrapper
			.on('click', '.btn-back-to-store', loadStoreView)
			.on('click', '.btn-back-to-cart', loadCartView())
			.on('click', '.btn-checkout', loadAddressFormView)
			.on('click', '.btn-back-to-form', loadAddressFormView);
	}

	return {
		init: addEventListeners,
		loadCart: loadCartView,
		loadStore: loadStoreView,
		loadReview: loadReviewOrderView
	}

}());

Store_View.init();