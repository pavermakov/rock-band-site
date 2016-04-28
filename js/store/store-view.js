var Store_View = (function(Utilities){

	var $main_wrapper = $('#main-wrapper'),
			$store_controls = $('.store-controls');
			$drop_navigation = $('#drop-navigation');

	function loadCartView(callback) {

		return function(event){
			Utilities.scrollTop();
			$main_wrapper.load('views/store/cart.php');

			if(callback){
				callback();
			}
			
		};
		
	}

	function loadAccountView(callback){
		return function(event){
			Utilities.scrollTop();
			$main_wrapper.load('views/store/account.php');

			if(callback){
				callback();
			}
			
		};
	}

	function loadAddressFormView() {
		Utilities.scrollTop();
		$main_wrapper.load('views/store/address_form.php');
	}

	function loadStoreView() {
		Utilities.scrollTop();
		$main_wrapper.load('store.php .product-list');
	}

	function loadReviewOrderView(){
		Utilities.scrollTop();
		$main_wrapper.load('views/store/review_order.php');
	}

	function _closeDropNav(){
		Utilities.scrollTop();
		$drop_navigation.toggleClass('nav-expanded');
	}

	function addEventListeners(){
		Utilities.cancelScroll();

		$store_controls
			.on('click', '.my-cart', loadCartView())
			.on('click', '.my-account', loadAccountView());

		$drop_navigation
			.on('click', '.drop-cart', loadCartView(_closeDropNav))
			.on('click', '.drop-account', loadAccountView(_closeDropNav));
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
		loadReview: loadReviewOrderView,
		loadAccount: loadAccountView
	}

}(Utilities));

Store_View.init();