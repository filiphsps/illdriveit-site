<!DOCTYPE html>
<html>
	<?php
		$title = 'View Contracts';
		include($_SERVER['DOCUMENT_ROOT'] . '/templates/head.php');

		//This page shouldn't be indexd
		http_response_code(404);
	?>
	
	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/header.php');?>

		<section>
			<div class="container-fluid">
				<h1 class="center">TODO<h1>
			</div>
		</section>
		
		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php');?>
	</body>
</html>