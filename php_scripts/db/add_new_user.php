<?php
session_start();
require_once("connect_db.php");

// returns the id of the inserted element
$successful_insert = $database->insert("users", [
	"email" => $_POST['email'],
	"password" => $_POST['password']
]);

if($successful_insert != "0"){
	$_SESSION["user_id"] = $successful_insert;
	echo json_encode("Success");
} else {
	echo json_encode("Error!");
}
