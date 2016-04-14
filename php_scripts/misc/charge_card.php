<?php
require_once("../db/get_cart_orders.php");
require_once("../vendor/stripe-php/init.php");

\Stripe\Stripe::setApiKey('sk_test_tmepCETcVqeHwCaLgPmwUUEv');

$errors = array();
$data = array();

// Get the credit card details submitted by the form
$token = $_POST['stripeToken'];

// Create the charge on Stripe's servers - this will charge the user's card
try {
  $charge = \Stripe\Charge::create(array(
    "amount" => dollarToPenny($final_price), // amount in cents, again
    "currency" => "usd",
    "source" => $token,
    "description" => "Chargin for products"
  ));

  $data['charge'] = $charge;
} catch(\Stripe\Error\Card $err) {
  // The card has been declined
	$errors['failed_charge'] = $err;
}


if(!empty($errors)){
	$data['errors'] = $errors;
}

echo json_encode($data);