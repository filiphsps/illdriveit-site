<?php
	// var_dump($_GET);
	$zip 		= $_GET['zip']?$_GET['zip']:$_POST['zip'];
	$mileage 	= $_GET['mileage']?$_GET['mileage']:$_POST['mileage'];
	$vin 	 	= $_GET['vin']?$_GET['vin']:$_POST['vin'];
	$callback 	= $_GET['callback']?$_GET['callback']:$_POST['callback'];

	$headers= array('Accept: application/json','Content-Type: application/json');
	if( $curl = curl_init() ) {
		curl_setopt($curl, CURLOPT_URL, 'https://high-quality.tech/illdriveit/warranty/verifyzip');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);		
  		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
		//curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, '{"zip":"'.$zip.'","mileage":'.$mileage.',"vin":"'.$vin.'"}');
		$out = curl_exec($curl);
		echo $callback.'('.$out.')';
		curl_close($curl);
	}
?>