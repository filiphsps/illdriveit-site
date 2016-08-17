<!DOCTYPE html>
<html>
	<?php
		$title = 'Home';
		include($_SERVER['DOCUMENT_ROOT'] . '/templates/head.php');
	?>

	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/header.php');?>

		<div class="maincontent">
			<div class="contentcenter homerelative">
				<div class="homepagemobile">
					<h1>
						<span>HELLO!</span>
						<img src="assets/img/wavingman.gif">
					</h1>
					<h2>WELCOME TO ILLDRIVE.IT<!--,<br/>
					Your Launchpad for the Sharing Economy&trade;--></h2>
				</div>

				<div class="homepagegraphic">
					<div class="center-bullet bullet">
						<span>illdrive</span> <span>.it</span>
					</div>

					<div class="top-bullet bullet">
						<a href="inspections/">
							<img class="launchpad-icon" src="assets/img/launcpad.png">
							<span class="mobiledesc">LAUNCH PAD</span>
						</a>
					</div>

					<div class="top-description graphdescription2">
						EVERYTHING YOU NEED TO START DRIVING <strong>TODAY</strong>
					</div>

					<div class="topright-bullet bullet">
						<a href="forcefield/">
						<img src="assets/img/icongraf2.png">
						<span class="mobiledesc">FORCEFIELD</span></a>
					</div>

					<div class="topright-description graphdescription">
						YOUR FORCEFIELD - LIKE A<br>
						WARRANTY ON <strong>STEROIDS</strong>
					</div>

					<div class="bottomright-bullet bullet">
						<div class="hovereffect">
							<img src="assets/img/icongraf3.png">
							<span class="mobiledesc">DRIVER<br>TOOLS</span>
							<span class="hovertxt">COMING<br>SUMMER<br>2016!</span>
						</div>
					</div>

					<div class="bottomright-description graphdescription">
						DRIVER TOOLS<br>
						<strong>COMING SUMMER 2016</strong>
					</div>

					<div class="bottom-bullet bullet">
						<div class="hovereffect">
							<img src="assets/img/icongraf4.png">
							<span class="mobiledesc">START<br> DRIVING</span>
							<span class="hovertxt">COMING<br> SUMMER<br> 2016!</span>
						</div>
					</div>

					<div class="bottom-description graphdescription">
						RIDESHARE PLACEMENT<br>
						<strong>COMING FALL 2016</strong>
					</div>

					<div class="bottomleft-bullet bullet">
						<a href="training/">
							<img src="assets/img/icongraf5.png">
							<span class="mobiledesc">TRAINING</span>
						</a>
					</div>

					<div class="bottomleft-description graphdescription2">
						DRIVER TRAINING<br>
						<strong>COMING SUMMER 2016</strong>
					</div>

					<div class="topleft-bullet bullet">
						<a href="locations/">
							<img src="assets/img/icongraf6.png">
							<span class="mobiledesc">LOCATIONS</span>
						</a>
					</div>

					<div class="topleft-description graphdescription2">
						CHECK OUT OUR NEW<br>
						<strong>LOCATIONS</strong>
					</div>
				</div>
			</div>
		</div>

		<?php include($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php');?>
		
		<script>
			$(document).ready(function(){
				$('.stripemenu').on('click', function(){
					$(this).next('ul').slideToggle();
				});
				
				var clickHandler = "click";
				if('ontouchstart' in document.documentElement){
					clickHandler = "touchstart";
				}
				$(".hovereffect").bind(clickHandler,function(){
					$(this).toggleClass('showhover');
				});
			});
		</script>
	</body>
</html>