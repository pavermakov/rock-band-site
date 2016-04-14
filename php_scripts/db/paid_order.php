<?php
if(!isset($_SESSION)) { 
    session_start(); 
}
require_once("connect_db.php");

$errors = array();
$data = array();

if(!empty($_SESSION["user_id"])){

	$affectedRows = $database->update("orders", [
		"order_status" => "paid"
	], [
		"user_id" => $_SESSION["user_id"]
	]);

	if($affectedRows > 0){
		# successful update
		$data["affected_fields"] = $affectedRows;
	} else {
		$errors["failed_to_update"] = "Failed to update the database";
	}

} else {
	# For some reason, the the user session is not set
	$errors["Session_error"] = "Failed to start a session.";
}

if(!empty($errors)){
	$data["success"] == false;
	$data["errors"] = $errors;
} else {
	$data["success"] = true;
}

echo json_encode($data);