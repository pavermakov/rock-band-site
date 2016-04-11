<?php
require_once("connect_db.php");
require_once("get_user_info.php");

$errors = array();
$data = array();

if(!empty($_SESSION["user_id"])){

	$updatedFields = array();
	$user = $user[0];

	$first_name = trim($_POST["first_name"]);
	$last_name = trim($_POST["last_name"]);
	$address = trim($_POST["address"]);
	$city = trim($_POST["city"]);
	$province = trim($_POST["province"]);
	$country = trim($_POST["country"]);
	$zip = trim($_POST["zip"]);

	if($first_name != $user["first_name"] || empty($user["first_name"])){
		$updatedFields["first_name"] = $first_name;
	}

	if($last_name != $user["last_name"] || empty($user["last_name"])){
		$updatedFields["last_name"] = $last_name;
	}

	if($address != $user["address"] || empty($user["address"])){
		$updatedFields["address"] = $address;
	}

	if($city != $user["city"] || empty($user["city"])){
		$updatedFields["city"] = $city;
	}

	if($province != $user["province"] || empty($user["province"])){
		$updatedFields["province"] = $province;
	}

	if($country != $user["country"] || empty($user["country"])){
		$updatedFields["country"] = $country;
	}

	if($zip != $user["zip"] || empty($user["zip"])){
		$updatedFields["zip"] = $zip;
	}


	if(!empty($updatedFields)){
		# Update the database
		$affectedRows = $database->update("users", $updatedFields, [
			"id" => $_SESSION["user_id"]
		]);

		# Check if the fields were updated

		if($affectedRows > 0){
			$data["affected_fields"] = $affectedRows;
		} else {
			# none of the field were update
			# must be an error
			$errors["failed_update"] = "Failed to update fields.";
		}

	} else {
		$data["affected_fields"] = 0;
	}
	

} else {
	# For some reason, the the user session is not set
	$errors["Session_error"] = "Failed to start a session.";
}

# check if there are no errors
if(!empty($errors)){
	# there are a few errors
	$data["success"] = false;
	$data["errors"] = $errors;
} else {
	# no errors
	$data["success"] = true;
	$data["updated_fields"] = $updatedFields;
}

echo json_encode($data);
