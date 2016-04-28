<?php
	if(!isset($_SESSION)) { 
    session_start(); 
	}
	require_once("../../php_scripts/db/get_user_info.php");
	if(!empty($user)){
		$user = $user[0];
	}
?>

<section id="shipping-information">
	
	<header class="shipping-header">
		
		<h2><i class="fa fa-truck" aria-hidden="true"></i> Shipping Information</h2>

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

	</section>

	<div class='store-btns'>
		<button class='cart-btn cart-btn-left btn-dark btn-review-order' type='button'>Review order</button>
		<button class='cart-btn cart-btn-left btn-light btn-back-to-cart' type='button'>Back to cart</button>
		<button class='cart-btn cart-btn-left btn-light btn-back-to-store' type='button'>Back to store</button>
		<div class='clearfix'></div>
	</div>

</section>