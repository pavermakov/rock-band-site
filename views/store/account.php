<?php
	if(!isset($_SESSION)) { 
    session_start(); 
	}

	require_once("../../php_scripts/db/get_orders_history.php");
	require_once("../../php_scripts/db/get_user_info.php");

	if(!empty($user)){
		$user = $user[0];
	}
?>

<section id="account">

	<header class="cart-header">
		<h2><i class="fa fa-user" aria-hidden="true"></i> User Information</h2>
	</header>

	<section class="shipping-information">

		<form class="shipping-form" novalidate>

			<div class="personal-info">
				<h3>Personal Information</h3>
				<input class="half-width float-left" type="text" name="first_name" value="<?php echo $user['first_name'] ?>" placeholder="First name">
				<input class="half-width float-right" type="text" name="last_name" value="<?php echo $user['last_name'] ?>" placeholder="Last name">
				<div class="clearfix"></div>
			</div>		

			<div class="address">
				<h3>Mailing Address</h3>
				<input class="full-width" type="text" name="address" value="<?php echo $user['address'] ?>" placeholder="Address">
				<input class="half-width float-left" type="text" value="<?php echo $user['city'] ?>" name="city" placeholder="City">
				<input class="half-width float-right" type="text" name="province" value="<?php echo $user['province'] ?>" placeholder="State / Province">
				<input class="half-width float-left" type="text" name="country" value="<?php echo $user['country'] ?>" placeholder="Country">
				<input class="half-width float-right" type="text" name="zip" value="<?php echo $user['zip'] ?>" placeholder="Zip (min. 4)">
				<div class="clearfix"></div>
			</div>	

			<div class="error-field hidden">
				The selected field has an error!
			</div>
			
		</form>

		<div class='store-btns'>
			<button class='cart-btn cart-btn-center btn-dark btn-update-user' type='button'>Update user</button>
			<div class='clearfix'></div>
		</div>

	</section>

	<header class="cart-header">
		<h2><i class="fa fa-clock-o" aria-hidden="true"></i> Purchasing History</h2>
	</header>

	<section class="paid-orders">

		

		<?php
			if(!empty($paid_orders)){

					# table

					echo "
						<article class='table'>
							<div class='table-row table-header'>
								<div class='table-row-item item-small'>Order id</div>
								<div class='table-row-item item-small'>Item</div>
								<div class='table-row-item item-big'>Description</div>
								<div class='table-row-item item-small'>Price</div>
							</div>
					";

				foreach ($paid_orders as $order) {

					if(!is_null($order["order_size"])){
						$size = "( ".$order["order_size"]." )";
					} else {
						$size = '';
					}

					echo "
						<div class='table-row table-content'>
							<div class='table-row-item item-small'>". $order["order_id"] ."</div>
							<div class='table-row-item item-small'>
								<figure class='small-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
								</figure>
							</div>
							<div class='table-row-item item-big'>". $order["order_amount"] ." x ". $order["product_name"] ." ". $size ."</div>
							<div class='table-row-item item-small'>$ ". $order["order_price"] ."</div>
						</div>
					";
				}

				echo "
					</article>
				";


				# Display list (for mobile devices)
				echo "
					<article class='list'>
				";

				foreach ($paid_orders as $order) {

					if(!is_null($order["order_size"])){
						$size = "( ".$order["order_size"]." )";
					} else {
						$size = '';
					}

					echo "
						<article class='list-item'>
							<header class='list-item-row list-header'>Order #". $order["order_id"] ."</header>
							<section class='list-item-row list-item-content no-padding'>
								<figure class='list-item-image'>
									<img src='". $order["product_image"] ."' alt='". $order["product_name"] ."'>
									<figcaption class='list-item-description'>
										<div class='list-item-row list-item-name list-big'>". $order["product_name"] ."</div>
										<div class='list-item-row list-item-quantity list-small'>". $order["order_amount"] ." pc</div>
										<div class='list-item-row list-item-price list-small'>$ ". $order["order_price"] ."</div>
									</figcaption>
								</figure>
							</section>
						</article>
					";

				}

			} else {
				echo "
					<div class='empty-cart'>empty</div>
				";
			}
		?>



	</section>

	<div class='store-btns'>
			<button class='cart-btn cart-btn-left btn-light btn-back-to-store' type='button'>Back to store</button>
			<div class='clearfix'></div>
		</div>

</section>