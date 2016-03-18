<?php
	require_once("./php_scripts/db/connect_db.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="theme-color" content="#000000">
	<title>Bobby Bubonic and the Plague</title>
	<link href='https://fonts.googleapis.com/css?family=Hind' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/normilize.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/store_page.css">
</head>
<body>

	<div id="container">

		<header id="store-header">
			<figure class="logo-holder">
				<img src="./img/logo.jpg" alt="Logo">
			</figure>

			<ul class="full-nav">
				<li><a href="./index.html">NEWS</a></li>
				<li><a href="music.html">MUSIC</a></li>
				<li><a href="about.html">ABOUT</a></li>
			</ul>

			<div id="nav-toggle-box">
				<i class="fa fa-bars"></i>
			</div>

		</header>		

		<main id="main-content" role="main">

			<aside id="info-panel" class="side-bar">
				<div class="store-controls side-content-wrapper">
					<div><p><i class="fa fa-user"></i>My Account</p></div>
					<div><p><i class="fa fa-shopping-cart"></i>My Cart</p></div>
				</div>

				<div class="social-links side-content-wrapper">
					<i class="fa fa-facebook-square"></i>
					<i class="fa fa-twitter"></i>
					<i class="fa fa-soundcloud"></i>
					<i class="fa fa-star"></i>
				</div>

				<div class="clearfix"></div>
			</aside>

			<section id="product-list">

				<?php 
					foreach ($products as $product) {
						echo "
							<div class='product-item'>
								<figure>
									<img src='". $product["product_image"] ."' alt='". $product["product_name"] ."'>
									<figcaption class='product-name'>". $product["product_name"] ."</figcaption>
									<figcaption>
										<i class='product-price'>$". $product["product_price"] ."</i>
										<div class='order-button'>order</div>
										<div class='clearfix'></div>
									</figcaption>
								</figure>
							</div>
						";
					}
				?>

			</section>
			
		</main>

		<footer id="page-footer">		
			BOBBY BUBONIC &copy; THE PLAGUE 2016 <br> ALL RIGHTS RESERVED
		</footer>


		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		
	</div><!-- end of #container -->

</body>
</html>