<?php
session_start();
require_once("connect_db.php");

$orders = $database->select("orders", [
	"[><]products" => "product_id"
],[
	"orders.order_id",
	"orders.product_id",
	"products.product_name",
	"orders.order_amount",
	"orders.order_size",
	"orders.order_price",
	"products.product_image"
],[

	"AND" => [
		"orders.user_id" => $_SESSION["user_id"],
		"orders.order_status" => "in cart"
	]

]);

$total_sum = $database->sum("orders", "order_price", [
	"AND" => [
		"orders.user_id" => $_SESSION["user_id"],
		"orders.order_status" => "in cart"
	]
]);

