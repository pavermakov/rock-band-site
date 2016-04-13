<?php
if(!isset($_SESSION)) { 
    session_start(); 
}
require_once("connect_db.php");

$errors = array();
$data = array();

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

} else {
	$errors["no_user"] = "Session does not exist";
	$data["success"] = false;
	$data["errors"] = $errors;
	echo json_encode($data);
}



