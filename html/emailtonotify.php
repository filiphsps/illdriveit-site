<?php
	//var_dump($_GET);
	$headers= array('Accept: application/json','Content-Type: application/json');
	if( $curl = curl_init() ) {
		curl_setopt($curl, CURLOPT_URL, 'https://high-quality.tech/illdriveit/emailtonotify');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);		
  		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($curl, CURLOPT_POSTFIELDS, $_GET['data'];
		$out = curl_exec($curl);
		echo $_GET['callback'].'('.$out.')';
		curl_close($curl);
	}
?>