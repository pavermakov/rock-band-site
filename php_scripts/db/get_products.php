<?php

$products = $database->select("products", [
	"product_id", 
	"product_name", 
	"product_price", 
	"product_image", 
	"multiple_size"
]);