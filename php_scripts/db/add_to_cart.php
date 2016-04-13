<?php
session_start();
require_once("connect_db.php");

$errors = array();
$data = array();

if(empty($_POST["id"])){
	$errors["product_id"] = "Product id is empty";
} else {
	$product_id = $_POST["id"];
}

if(empty($_SESSION["user_id"])){
	$errors["user_id"] = "User id is empty";
} else {
	$user_id = $_SESSION["user_id"];
}

if(empty($_POST["amount"])){
	$errors["amount"] = "Amount is empty";
} else {
	$order_amount = $_POST["amount"];
}

if(empty($_POST["size"])){
	$order_size = NULL;
} else {
	$order_size = $_POST["size"];
}

if(empty($_POST["price"])){
	$error["price"] = "Price is empty";
} else {
	$order_price = number_format((float)$_POST["price"], 2, '.', '');
}

$order_status = "in cart";

if(empty($errors)){
	$new_order = $database->insert("orders", [
		"product_id" => $product_id,
		"user_id" => $user_id,
		"order_amount" => $order_amount,
		"order_size" => $order_size,
		"order_price" => $order_price,
		"order_status" => $order_status
	]);

	if($new_order) {
		$data["success"] = true;
	} else {
		$data["success"] = false;
	}

} else {
	$data["success"] = false;
}

echo json_encode($data);



