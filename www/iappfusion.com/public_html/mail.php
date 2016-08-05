<?php
	//declare our assets 
; 
	$name = stripcslashes($_POST['contactName']);
	$to = 'kenny.kurtz@iappfusion.com';
	$from = stripcslashes($_POST['contactEmail']);
	$comment = stripcslashes($_POST['contactMessage']);
	$interest = stripcslashes($_POST['contactInterest']);
	$phone = stripcslashes($_POST['contactPhone']);
	$subject = "Web Contact";	
	$body = "From: $name - $from \r\n Phone: $phone \r\n Interest: $interest \r\n Message: $comment";
$body = preg_replace("/^(?=\n)|[^\r](?=\n)/", "\\0\r", $body);
	//validate the email address on the server side
	if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $from) ) {
		//if successful lets send the message
		$return = mail($to, $subject, $body);
		echo("Thank you. We will repond to your message as soon as possible. $return"); //return success callback
	} else {
		echo('An invalid email address was entered'); //email was not valid
	}
?>