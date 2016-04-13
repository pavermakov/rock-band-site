<?php
	if(!isset($_SESSION)) { 
    session_start(); 
}
	require_once("../../php_scripts/db/get_cart_orders.php");
	require_once("../../php_scripts/db/get_user_info.php");
?>

<section id="review-order">
	
	<header class="review-header">
		
		<h2><i class="fa fa-check-circle-o" aria-hidden="true"></i> Review your order</h2>

	</header>

	<section class="review-body table"> <!-- table -->

		<div class="table-row table-header">
			<div class="table-row-item-medium">Options</div>
			<div class="table-row-item-medium">Items</div>
			<div class="table-row-item">Name</div>
			<div class="table-row-item-medium">Quantity</div>
			<div class="table-row-item-medium">Price</div>
		</div>

		<?php

			if(!empty($user) && !empty($orders)){
				$user = $user[0];

				foreach ($orders as $order) {
					if(!is_null($order["order_size"])){
						$size = "( ".$order["order_size"] . " )";
					} else {
						$size = '';
					}

					echo "
						<div class='table-row table-content'>
							<div class='table-row-item-medium'>Remove</div>
							<div class='table-row-item-medium'>
								<figure class='small-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
								</figure>
							</div>
							<div class='table-row-item'>". $order["product_name"] ." ". $size ."</div>
							<div class='table-row-item-medium'>". $order["order_amount"] ."</div>
							<div class='table-row-item-medium'>$ ". $order["order_price"] ."</div>
						</div>
					";
				}
			}

		?>		

		<div class="table-row table-content">
			<div class="table-row-item-medium">Remove</div>
			<div class="table-row-item-medium">
				<figure class="small-image">
					<img src="././img/store/t-shirt.jpg" alt="">
				</figure>
			</div>
			<div class="table-row-item">Men T-shirt (L)</div>
			<div class="table-row-item-medium">5</div>
			<div class="table-row-item-medium">$87.99</div>
		</div>

		<div class="table-row table-content">
			<div class="table-row-item-medium">Remove</div>
			<div class="table-row-item-medium">
				<figure class="small-image">
					<img src="././img/store/t-shirt.jpg" alt="">
				</figure>
			</div>
			<div class="table-row-item">Men T-shirt (L)</div>
			<div class="table-row-item-medium">5</div>
			<div class="table-row-item-medium">$87.99</div>
		</div>

		<div class="table-row table-header"><!-- mailing address header-->
			<div class="table-row-item-medium">State</div>
			<div class="table-row-item-medium">City</div>
			<div class="table-row-item">Address</div>
			<div class="table-row-item-medium">Country</div>
			<div class="table-row-item-medium">Zip</div>
		</div>

		<div class="table-row table-content table-address">
			<div class="table-row-item-medium">Ohio</div>
			<div class="table-row-item-medium">Sandusky</div>
			<div class="table-row-item">1 Cedar Point Dr</div>
			<div class="table-row-item-medium">USA</div>
			<div class="table-row-item-medium">44870</div>
		</div>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Subtotal</div>
			<div class="table-row-item-medium">$175.98</div>
		</div>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Shipping</div>
			<div class="table-row-item-medium">$8.99</div>
		</div>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Total</div>
			<div class="table-row-item-medium final-price">$184.97</div>
		</div>

	</section>

	<div class='store-btns'>
		<button class='cart-btn cart-btn-left btn-dark btn-pay' type='button'>Proceed to Payment</button>
		<button class='cart-btn cart-btn-left btn-light btn-back-to-form' type='button'>Back to form</button>
		<button class='cart-btn cart-btn-left btn-light btn-back-to-cart' type='button'>
			<i class="fa fa-chevron-left" aria-hidden="true"></i> Back to cart
		</button>	
		<div class='clearfix'></div>
	</div>

</section>