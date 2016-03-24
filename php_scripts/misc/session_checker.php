<?php
session_start();

$data = array();

if(isset($_SESSION["user_id"])) {
	$data["success"] = true;
} else {
	$data["success"] = false;
}

echo json_encode($data);