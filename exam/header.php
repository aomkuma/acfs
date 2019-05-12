<?php
	ini_set('display_errors','Off');

	header('Content-Type: text/html; charset=utf-8');
	$servername = "localhost";
	
	$username = "root";	//***//
	$password = "";	//***//
	$dbname = "classroom";	//***//

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	$conn->set_charset("utf8");
?>