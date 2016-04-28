<?php
	require_once("../../php_scripts/db/get_cart_orders.php");
?>

<section id="cart">
	<header class="cart-header">
		<h2><i class='fa fa-shopping-cart'></i> Your Cart</h2>
	</header>

	<section class="cart-wrapper">

		<?php
			if(!empty($orders)){
				foreach ($orders as $order) {
					echo "
						<div class='cart-item'>
							<figure>
								<i id='remove-item' class='fa fa-times-circle remove-from-cart' data-order-id='". $order["order_id"] ."'></i>
								<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
								<figcaption>". $order["product_name"] ." (x". $order["order_amount"] .")</figcaption>
							
					";

					if(!is_null($order["order_size"])){
						echo "<div class='cart-item-size'>". $order["order_size"] ."</div>";
					}

					echo "<div class='cart-item-price'>$". $order["order_price"] ."</div>";
					echo "<div class='clearfix'></div>";
					echo "</figure>";
					echo "</div>";
				}
			} else {
				echo "<div class='empty-cart'>empty</div>";
			}
		?>
	</section>

	<?php
		if(!empty($orders)){
			echo "
				<div class='store-btns'>
					<h2>Total: $". $total_sum ."</h2>
					<button class='cart-btn cart-btn-left btn-dark btn-checkout' type='button'>Checkout</button>
					<button class='cart-btn cart-btn-left btn-light btn-back-to-store' type='button'>Back to store</button>
					<div class='clearfix'></div>
				</div>
			";
		} else {
			echo "
				<div class='store-btns'>
					<button class='cart-btn cart-btn-center btn-light btn-back-to-store' type='button'>Back to store</button>
				</div>
			";
		}
	?>

</section>