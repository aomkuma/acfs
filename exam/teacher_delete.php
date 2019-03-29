<?php

	include 'header.php';

	// 1
	$teacher_id = $_GET['teacher_id'];

	// 2
	
	$SQL = "DELETE FROM teacher WHERE teacher_id = '" . $teacher_id . "'";
	$result = $conn->query($SQL);

	echo "ลบข้อมูลเรียบร้อยแล้ว <a href='index.php'>กลับหน้าแรก</a>";

?>