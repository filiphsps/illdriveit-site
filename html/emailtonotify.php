<?php
	$headers= array('Accept: application/json','Content-Type: application/json');
	if( $curl = curl_init() ) {
		curl_setopt($curl, CURLOPT_URL, 'https://high-quality.tech/illdriveit/emailtonotify');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);		
  		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
		//curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, '{"vin":"'.$_POST['vin'].'","email":"'.$_POST['email'].'"}');
		$out = curl_exec($curl);
		echo $_POST['callback'].'('.$out.')';
		// echo '{"vin":"'.$_POST['vin'].'","email":"'.$_POST['email'].'"}';
		curl_close($curl);
	}
	/*$result = file_get_contents('http://api.local/rest/users', null, stream_context_create(array(
				'http' => array(
				'method' => 'POST',
				'header' => 'Content-Type: application/json' . "\r\n"
				. 'Content-Length: ' . strlen($data_string) . "\r\n",
				'content' => $data_string,
				),
			)));
	echo $result;*/
?>