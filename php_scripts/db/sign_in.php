<?php
session_start();
require_once("connect_db.php");

$errors = array();
$data = array();

// check if email exists ======================================================
if (empty($_POST['email'])) {
	$errors['email'] = 'Email is required.';
}// } else {
// 	$errors['empty_email'] = "The email is empty(var)";
	// $users = $database->select("users", "id", ["email" => $_POST["email"]]);
	// if(count($users) == 0) {
	// 	$errors['not_exist'] = "The user with this email does not exist";
	// }	
// }

if (empty($_POST['password'])) {
	$errors['password'] = 'Password is required.';
}// } else /*if(empty($errors))*/ {

	// $db_pass = $database->select("users", "password", [
	// 	"email" => $_POST["email"]
	// ]);

	// if(!password_verify($_POST['password'], $db_pass[0])) {
	// 	$errors['wrong_pass'] = "Wrong Password";
// 	}
// }
	
if(empty($errors)){
	//check if email is in db
	$user = $database->select("users", "id", ["email" => $_POST["email"]]);
	$db_pass = $database->select("users", "password", ["email" => $_POST["email"]]);

	if(!$user){
		$errors['not_exist'] = "The user with this email does not exist";
	}

	if(!password_verify($_POST['password'], $db_pass[0])){
		$errors['wrong_pass'] = "Wrong Password";
	}

	if(empty($errors)){
		$_SESSION["user_id"] = $user[0];
		$data['success'] = true;
		$data['message'] = 'Success';
		$data['user'] = $_SESSION["user_id"];
	} else {
		$data['success'] = false;
  	$data['errors']  = $errors;
	}

} else {
	$data['success'] = false;
  $data['errors']  = $errors;
}

// return a response ===========================================================

// if (!empty($errors)) {
//   // if there are items in our errors array, return those errors
//   $data['success'] = false;
//   $data['errors']  = $errors;
// } else {
// 	$_SESSION["user_id"] = $users;
// 	$data['success'] = true;
// 	$data['message'] = 'Success';
// }

echo json_encode($data);