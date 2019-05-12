<?php

	// error_reporting(E_ERROR);
                // error_reporting(E_ALL);
    include 'header.php';

    
	$sql = "SELECT * FROM teacher";
	$result = $conn->query($sql);
	echo "<a href='index.php'>จัดการข้อมูลอาจารย์</a>&nbsp;&nbsp;";
	echo "<a href='student.php'>จัดการข้อมูลนักศึกษา</a>";
	echo "<br>";
	
	echo "<a href='teacher_update.php'>เพิ่มข้อมูลอาจารย์</a>&nbsp;&nbsp;";
	echo "<table border='1' cellpadding='5'>";
	echo "<tr>
				<td>รหัส</td>
				<td>ชื่อ</td>
				<td>นามสกุล</td>
				<td>แก้ไข</td>
				<td>ลบ</td>
			</tr>
		";
	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	echo "<tr>";
	        echo "<td>" . $row["teacher_id"] . "</td>";
	        echo "<td>" . $row["firstname"] . "</td>";
	        echo "<td>" . $row["lastname"] . "</td>";
	        echo "<td><a href='teacher_update.php?teacher_id=" . $row["teacher_id"] . "'>แก้ไข</a></td>";
	        echo "<td><a  href='teacher_delete.php?teacher_id=" . $row["teacher_id"] . "'>ลบ</a></td>";
	        echo "</tr>";
	    }
	} else {
	    echo "ไม่มีข้อมูล";
	}
	echo "<table>";
	$conn->close();

?>
