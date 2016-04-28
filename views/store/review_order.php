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

	<section class="table"> <!-- table -->

		<div class="table-row table-header">
			<div class="table-row-item-small">Items</div>
			<div class="table-row-item-large">Name</div>
			<div class="table-row-item-small">Size</div>
			<div class="table-row-item-small">Quantity</div>
			<div class="table-row-item-small">Price</div>
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
						<div class='table-row table-background'>
							<div class='table-row-item-small'>
								<figure class='small-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
								</figure>
							</div>
							<div class='table-row-item-large'>". $order["product_name"]."</div>
							<div class='table-row-item-small'>". $size ."</div>
							<div class='table-row-item-small'>". $order["order_amount"] ."</div>
							<div class='table-row-item-small'>$ ". $order["order_price"] ."</div>
						</div>
					";
				}
			}

		?>

		<div class="table-row table-header"><!-- mailing address header-->
			<div class="table-row-item-small">City</div>		
			<div class="table-row-item-large">Address</div>
			<div class="table-row-item-small">State</div>	
			<div class="table-row-item-small">Country</div>
			<div class="table-row-item-small">Zip</div>
		</div>

		<?php
			if(!empty($user) && !empty($orders)){
				$user = $user[0];

				echo "
					<div class='table-row table-background table-address'>
						<div class='table-row-item-small'>". $user["city"] ."</div>				
						<div class='table-row-item-large'>". $user["address"] ."</div>
						<div class='table-row-item-small'>". $user["province"] ."</div>	
						<div class='table-row-item-small'>". $user["country"] ."</div>
						<div class='table-row-item-small'>". $user["zip"] ."</div>
					</div>
				";
			}
		?>

		<div class="table-row table-background table-summary">
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-large item-hidden"></div>
			<div class="table-row-item-small upcase text-bold">Subtotal</div>
			<div class="table-row-item-small">$ <?php echo $total_sum ?></div>
		</div>

		<div class="table-row table-background table-summary">
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-large item-hidden"></div>
			<div class="table-row-item-small upcase text-bold">Shipping</div>
			<div class="table-row-item-small">$ <?php echo $shipping ?></div>
		</div>

		<div class="table-row table-background table-summary">
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-small item-hidden"></div>
			<div class="table-row-item-large item-hidden"></div>
			<div class="table-row-item-small upcase text-bold">Total</div>
			<div class="table-row-item-small final-price">$ <?php echo $final_price ?></div>
		</div>

	</section>

	<section class="list">

		<?php
			if(!empty($user) && !empty($orders)){
				$i = 1; # order counter

				foreach($orders as $order){
					if(!is_null($order["order_size"])){
						$size = ", ( ".$order["order_size"]." )";
					} else {
						$size = '';
					}

					echo "
						<article class='list-item table-background'>
							<header class='list-item-header'>Item #".$i."</header>
							<section class='list-item-body'>
								<figure class='list-item-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
									<figcaption class='list-item-description'>
										<div class='list-item-name'>". $order["product_name"]."". $size."</div>
										<div class='list-item-quantity'>". $order["order_amount"] ." pc</div>
										<div class='list-item-price'>$ ". $order["order_price"] ."</div>
									</figcaption>
								</figure>
							</section>
						</article>
					";

					$i++;
				}
			}
		?>

		<article class="list-address table-background">
			<header class="list-item-header">Mailing Address</header>
			<div class="list-address-description">
				<?php
					if(!empty($user) && !empty($orders)){
						echo "
							<div class='list-address-street'>". $user["address"] ."</div>				
							<div class='list-address-state'>". $user["city"] .", ". $user["province"] ."</div>
							<div class='list-address-country'>". $user["country"] .", ". $user["zip"] ."</div>	
						";
					}
				?>
			</div>
		</article><!-- end of .list-address -->

		<article class="list-payment table-background">
			<header class="list-item-header">Payment</header>
			<div class="list-payment-item">
				<div class="upcase text-bold">Subtotal</div>
				<div>$ <?php echo $total_sum ?></div>
			</div>
			<div class="list-payment-item">
				<div class="upcase text-bold">Shipping</div>
				<div>$ <?php echo $shipping ?></div>
			</div>
			<div class="list-payment-item">
				<div class="upcase text-bold">Total</div>
				<div class="final-price">$ <?php echo $final_price ?></div>
			</div>
		</article>

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