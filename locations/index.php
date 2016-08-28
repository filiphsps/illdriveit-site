<!DOCTYPE html>
<html>
	<head>
		<title>LOCATIONS - illdrive.it</title>
		<meta charset="UTF-8">
		<meta name="description" content="">
		<meta name="author" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="stylesheet" href="../assets/css/bootstrap.min.css">		
		<link rel="stylesheet" type="text/css" href="../assets/css/style.css">
		<link rel="stylesheet" type="text/css" href="../assets/css/style2.css">
		<link rel="icon" 
			type="image/png" 
			href="https://www.illdrive.it/assets/img/logo.png"/>
	</head>
	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/header.php');?>

		<section id="warranty">
			<div class="container-fluid locationspage">
					<div class="col-md-8 col-sm-12 col-xs-12">
						<h1 class="text-center">CHECK US OUT!</h1>
						<h2 class="text-center">We're everywhere...almost!</h2>	
					<div class="col-md-4 col-sm-12 col-xs-12 pull-right rightimg mobileonly" style="display:none;">
						<img class="img-responsive img-circle" src="../assets/img/locations-image.png">
					</div>
						<div class="col-md-12 col-sm-12 col-xs-12 text-center">
							<img src="map.svg" style="max-width:100vw"/>
						</div>
						
					</div>
					<div class="col-md-4 col-sm-12 col-xs-12 pull-right rightimg noonmobile">
						<img class="img-responsive img-circle" src="../assets/img/locations-image.png">
					</div>

			</div>
		</section>

		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php');?>
	</body>
</html>