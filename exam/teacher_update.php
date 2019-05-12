<?php

	// error_reporting(E_ERROR);
                // error_reporting(E_ALL);
    include 'header.php';

    $teacher_id = $_REQUEST['teacher_id'];

    if(!empty($teacher_id)){
    	$sql = "SELECT * FROM teacher WHERE teacher_id = " . $teacher_id;
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$firstname = $row["firstname"];
		$lastname = $row["lastname"];
    }
	// $sql = "SELECT * FROM teacher";

	
	$conn->close();

?>

<?php if(empty($teacher_id)){ ?>
	<form action="teacher_save.php" method="post">
	<table>
		<tr>
			<td>ชื่อ</td>
			<td><input type="text" name="firstname"></td>
		</tr>
		<tr>
			<td>นามสกุล</td>
			<td><input type="text" name="lastname"></td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<input type="submit" value="แก้ไขข้อมูล">
			</td>
		</tr>
	</table>
</form>
<?php }else{ ?>
	<form action="teacher_save.php" method="post">
	<table>
		<tr>
			<td>รหัส</td>
			<td><input type="number" name="teacher_id" value="<?= $teacher_id ?>"></td>
		</tr>
		<tr>
			<td>ชื่อ</td>
			<td><input type="text" name="firstname" value="<?= $firstname ?>"></td>
		</tr>
		<tr>
			<td>นามสกุล</td>
			<td><input type="text" name="lastname" value="<?= $lastname ?>"></td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<input type="submit" value="แก้ไขข้อมูล">
			</td>
		</tr>
	</table>
</form>
<?php } ?>


