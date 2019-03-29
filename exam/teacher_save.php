<?php

	include 'header.php';

	// 1
	$teacher_id = $_POST['teacher_id'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];

	// 2
	if(empty($teacher_id)){
		$SQL = "INSERT INTO teacher (firstname, lastname) VALUES ('" . $firstname . "', '" . $lastname . "')";
	}else{
		$SQL = "UPDATE teacher SET firstname = '" . $firstname . "', lastname = '" . $lastname . "' WHERE teacher_id = '" . $teacher_id . "'";
	}
	$result = $conn->query($SQL);

	echo "<script>window.location.replace('index.php');</script>";

?>