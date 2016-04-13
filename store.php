<?php
	session_start();
	require_once("./php_scripts/db/connect_db.php");
	require_once("./php_scripts/db/get_products.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="theme-color" content="#000000">
	<title>Bobby Bubonic and the Plague</title>
	<link href='https://fonts.googleapis.com/css?family=Hind' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/normilize.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">	
	<link rel="stylesheet" href="bower_components/vex/css/vex.css">
	<link rel="stylesheet" href="bower_components/vex/css/vex-theme-wireframe.css">
	<link rel="stylesheet" href="bower_components/growl/stylesheets/jquery.growl.css">
	<link rel="stylesheet" href="css/store_page.css">
</head>
<body>

	<div id="container">

		<header id="store-header">
			<figure class="logo-holder">
				<img src="./img/logo.jpg" alt="Logo">
			</figure>

			<ul class="full-nav">
				<li><a class="active-link" href="store.php">STORE</a></li>
				<li><a href="./index.html">NEWS</a></li>
				<li><a href="music.html">MUSIC</a></li>
				<li><a href="about.html">ABOUT</a></li>
			</ul>

			<div id="nav-toggle-box">
				<i class="fa fa-bars"></i>
			</div>

		</header>		

		<nav id="drop-navigation" role="navigation">
			<ul>
				<li><a href="index.html">NEWS</a></li>
				<li><a href="music.html">MUSIC</a></li>
				<li><a class="active-link" href="store.php">STORE</a></li>
				<li><a href="about.html">ABOUT</a></li>
				<div class="drop-controls-wrapper">
					<ul class="drop-controls">
						<?php
							if(isset($_SESSION["user_id"])) {
								echo "
									<li><a href='#'><i class='fa fa-user'></i> MY ACCOUNT</a></li>
									<li class='drop-cart'><a href='#'><i class='fa fa-shopping-cart'></i> MY CART</a></li>
									<li class='drop-sign-out'><a href='#'><i class='fa fa-sign-out'></i> SIGN OUT</a></li>
								";
							} else {
								echo "
									<li class='drop-sign-in'><a href='#'><i class='fa fa-sign-in'></i> SIGN IN</a></li>
									<li class='drop-sign-up'><a href='#'><i class='fa fa-user-plus'></i> SIGN UP</a></li>
								";
							}
						?>
					</ul>
				</div>	

			</ul>
		</nav><!-- end of nav#primary-navigation-->

		<main id="main-content" role="main">

			<aside id="info-panel" class="side-bar">
				<div class="store-controls side-content-wrapper">
					<div class="controls">
						<?php

							if(isset($_SESSION["user_id"])) {
								echo "
									<div class='control'>
										<p><i class='fa fa-user'></i>My Account</p>
									</div>
									<div class='control my-cart'>
										<p><i class='fa fa-shopping-cart'></i>My Cart</p>
									</div>
									<div class='control my-sign-out'>
										<p><i class='fa fa-sign-out'></i>Sign Out</p>
									</div>
								";
							} else {
								echo "
									<div class='control my-sign-in'>
										<p><i class='fa fa-sign-in'></i> Sign In</p>
									</div>
									<div class='control my-sign-up'>
										<p><i class='fa fa-user-plus'></i> Sign Up</p>
									</div>
								";
							}

						?>
						<div class="clearfix"></div>
					</div>

				</div>

				<div class="social-links side-content-wrapper">
					<ul>
						<li>
							<a href="https://www.facebook.com/bobbybubonicandplague" target="_blank">
								<i class="fa fa-facebook-square"></i>
							</a>
						</li>
						<li>
							<a href="https://twitter.com/andtheplague" target="_blank">
								<i class="fa fa-twitter"></i>
							</a>
						</li>
						<li>
							<a href="https://soundcloud.com/bobbybubonic" target="_blank">
								<i class="fa fa-soundcloud"></i>
							</a>
						</li>
						<li>
							<a href="https://www.reverbnation.com/bobbybubonicandtheplague" target="_blank">
								<i class="fa fa-star"></i>
							</a>
						</li>
					</ul>
				</div>

				<div class="clearfix"></div>
			</aside>

			<section id="main-wrapper">
				<section class="product-list">

					<?php 
						foreach ($products as $product) {
							# don't forget to add new fields into the get_products.php file
							echo "
								<div class='product-item' data-id='". $product["product_id"] ."' data-price='". $product["product_price"] ."' data-name='". $product["product_name"] ."' data-multiple-size='". $product["multiple_size"] ."'>
									<figure>
										<img src='". $product["product_image"] ."' alt='". $product["product_name"] ."'>
										<figcaption class='product-name'>". $product["product_name"] ."</figcaption>
										<figcaption>
											<span class='product-price'>$". $product["product_price"] ."</span>
											<button type='button' class='view-button'>view</button>
											<div class='clearfix'></div>
										</figcaption>
									</figure>
								</div>
							";
						}
					?>

				</section>

			</section>
			
		</main>

		<footer id="page-footer">	
			<div class="social-links side-content-wrapper">
				<ul>
					<li>
						<a href="https://www.facebook.com/bobbybubonicandplague" target="_blank">
							<i class="fa fa-facebook-square"></i>
						</a>
					</li>
					<li>
						<a href="https://twitter.com/andtheplague" target="_blank">
							<i class="fa fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="https://soundcloud.com/bobbybubonic" target="_blank">
							<i class="fa fa-soundcloud"></i>
						</a>
					</li>
					<li>
						<a href="https://www.reverbnation.com/bobbybubonicandtheplague" target="_blank">
							<i class="fa fa-star"></i>
						</a>
					</li>
				</ul>
			</div>				
			BOBBY BUBONIC &copy; THE PLAGUE 2016 <br> ALL RIGHTS RESERVED
		</footer>

		

		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script src="bower_components/jquery-validation/dist/jquery.validate.min.js"></script>
		<script src="bower_components/vex/js/vex.js"></script>
		<script src="bower_components/vex/js/vex.dialog.js"></script>
		<script>vex.defaultOptions.className = 'vex-theme-wireframe';</script>
		<script src="bower_components/growl/javascripts/jquery.growl.js"></script>
		
		<script src="js/script.js"></script>
		<script src="js/store/sign-up.js"></script>
		<script src="js/store/sign-in.js"></script>
		<script src="js/store/sign-out.js"></script>	
		<script src="js/store/store-view.js"></script>
		<script src="js/store/store-action.js"></script>
		<script src="js/store/view-product.js"></script>		
		<script src="js/store/payment.js"></script>

	</div><!-- end of #container -->

</body>
</html>