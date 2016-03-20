<?php
require_once("connect_db.php");

#check if user exists
// $users = $database->select("users", ["email"] => "pavermakov@gmail.com");

$errors = array();
$data = array();

// validate the variables ======================================================

if (empty($_POST['email'])) {
	$errors['email'] = 'Email is required.';
} else {
	// make sure the user is unique ================================================
	$users = $database->select("users", "id", ["email" => $_POST["email"]]);
	if(count($users) != 0) {
		$errors['already_exists'] = "This email already exists.";
	}
		
}
	

if (empty($_POST['password']))
	$errors['password'] = 'Password is required.';

if (empty($_POST['conf_pass']))
	$errors['conf_pass'] = 'Please, confirm password.';

if($_POST["password"] != $_POST["conf_pass"])
	$errors['pass_mismatch'] = 'Passwords must match.';




// return a response ===========================================================

if (!empty($errors)) {
  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

	$data['success'] = true;
	$data['message'] = 'Success';
}

echo json_encode($data);