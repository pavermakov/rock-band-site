<?php
define("ROOT_PATH", "php_scripts/");

require_once(ROOT_PATH . "vendor/medoo.php");
require_once(ROOT_PATH . "db/db_login_info.php");

$database = new medoo([
	'database_type' => 'mysql',
	'database_name' => 'rock_band',
	'server' => 'localhost',
	'username' => $my_username,
	'password' => $my_password,
	'charset' => 'utf8'
]);

$products = $database->select("products", ["product_name", "product_price", "product_image"]);