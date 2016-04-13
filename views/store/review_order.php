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
			<div class="table-row-item-medium">Items</div>
			<div class="table-row-item">Name</div>
			<div class="table-row-item-medium">Size</div>
			<div class="table-row-item-medium">Quantity</div>
			<div class="table-row-item-medium">Price</div>
		</div>

		<?php

			if(!empty($user) && !empty($orders)){

				foreach ($orders as $order) {
					if(!is_null($order["order_size"])){
						$size = $order["order_size"];
					} else {
						$size = '-';
					}

					echo "
						<div class='table-row table-content'>
							<div class='table-row-item-medium'>
								<figure class='small-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
								</figure>
							</div>
							<div class='table-row-item'>". $order["product_name"]."</div>
							<div class='table-row-item-medium'>". $size ."</div>
							<div class='table-row-item-medium'>". $order["order_amount"] ."</div>
							<div class='table-row-item-medium'>$ ". $order["order_price"] ."</div>
						</div>
					";
				}
			}

		?>

		<div class="table-row table-header"><!-- mailing address header-->
			<div class="table-row-item-medium">City</div>		
			<div class="table-row-item">Address</div>
			<div class="table-row-item-medium">State</div>	
			<div class="table-row-item-medium">Country</div>
			<div class="table-row-item-medium">Zip</div>
		</div>

		<?php
			if(!empty($user) && !empty($orders)){
				$user = $user[0];

				echo "
					<div class='table-row table-content table-address'>
						<div class='table-row-item-medium'>". $user["city"] ."</div>				
						<div class='table-row-item'>". $user["address"] ."</div>
						<div class='table-row-item-medium'>". $user["province"] ."</div>	
						<div class='table-row-item-medium'>". $user["country"] ."</div>
						<div class='table-row-item-medium'>". $user["zip"] ."</div>
					</div>
				";
			}
		?>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Subtotal</div>
			<div class="table-row-item-medium">$ <?php echo $total_sum ?></div>
		</div>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Shipping</div>
			<div class="table-row-item-medium">$ <?php echo $shipping ?></div>
		</div>

		<div class="table-row table-content table-summary">
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item-medium item-hidden"></div>
			<div class="table-row-item item-hidden"></div>
			<div class="table-row-item-medium upcase text-bold">Total</div>
			<div class="table-row-item-medium final-price">$ <?php echo $final_price ?></div>
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