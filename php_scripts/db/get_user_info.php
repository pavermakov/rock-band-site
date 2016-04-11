<?php
session_start();
require_once("connect_db.php");

if(!empty($_SESSION["user_id"])){

	$user = $database->select("users", [
		"first_name",
		"last_name",
		"address",
		"city",
		"province",
		"country",
		"zip"
	],[
		"id" => $_SESSION["user_id"]
	]);

}

