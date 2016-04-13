<?php
session_start();
require_once("connect_db.php");

$errors = array();
$data = array();

if(!empty($_POST["id"])) {
	$order_id = $_POST["id"];
} else {
	$errors["order_id"] = "Order id is empty";
}

if(!empty($_SESSION["user_id"])){
	$user_id = $_SESSION["user_id"]; 
} else {
	$errors["user_id"] = "User id is empty";
}

if(empty($errors)){

	$removed_item = $database->delete("orders", [
		"AND" => [
			"order_id" => $order_id,
			"user_id" => $user_id,
			"order_status" => "in cart"
		]
	]);

	if($removed_item){
		$data["success"] = true;
		# i want to check if there are item lest in the cart
		# and redirect to different pages depending on that
		$items_left = $database->count("orders",[
			"AND" => [
				"user_id" => $user_id,
				"order_status" => "in cart"
			]
		]);

		$data["items_left"] = $items_left;

	} else {
		$data["success"] = false;
		$data["errors"] = "Failed to remove an item.";
	}

} else {
	$data["success"] = false;
	$data["errors"] = $errors;
}

echo json_encode($data);