//Disable console.log
//console.log = function() {};

var	drive_data = {},
	slider = [{},{},{}],
	plans = {},
	pdfUrl;

var user = {
	'first_name': null,
	'last_name': null,

	'zip_code': null,
	'monthly': 0,
	'date': (new Date(Date.now())).toDateString()
}

$(document).ready(function(){
	/** BEGINS **/
	$("input[name=card_number]").mask("9999-9999-9999-9999");//{placeholder:'XXXX-XXXX-XXXX-XXXX'}
	$("input[name=mileage]").mask("000,000",{reverse: true});
	$('.input-number').keyup(function(){
		if($(this).val().replace(/[^0-9]/g,'')!=$(this).val())
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});
	$('.sigPad').signaturePad({
		drawOnly:true,
		bgColour:'white',
		penWidth:6,
		lineTop:200,
		onDrawEnd:function(){
			setTimeout(function(){check_input($('.sigPad').parents('.action-block'))},0);
		}
	});

	/** Actions **/
	$('.next-action-block').click(function(){
		var block = $(this).parents('.action-block');
		next_block(block);

		if(block.hasClass('block10') && drive_data.paymentOption.number_of_months==0){
			block = block.next('.action-block');
			parse_data(block);
			block.hide();
			var str = JSON.stringify(drive_data);
			console.log(str);
			ajax('payment',str);
		}else if(block.hasClass('block4')){
			$(".input-range" ).slider("disable");
		}else if(block.hasClass('block10')){
			block.find('.button-clear').addClass('hide-button');
			block.find('.sig').addClass('disabled');
		}
	});
	$('.next-custom-block').click(function(){
		var block = $(this).parents('.action-block');
		block.find('input').prop('disabled', true);
		block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('disabled');
		parse_data(block);
		if(block.hasClass('block3')){
			var str = JSON.stringify({zip:drive_data.warrantyRequest.zip, mileage:drive_data.warrantyRequest.mileage, vin:drive_data.warrantyRequest.vin});
			ajax('verifyzip',str);

		} else if(block.hasClass('block11')){
			
			//Save to user's data
			user['zip_code'] = drive_data.warrantyRequest.zip;
			user['first_name'] = drive_data.warrantyRequest.first_name;
			user['last_name'] = drive_data.warrantyRequest.last_name;
			user['email'] = drive_data.warrantyRequest.email;
			user['phone'] = drive_data.warrantyRequest.phone;
			user['address'] = drive_data.warrantyRequest.address1;
			user['address2'] = drive_data.warrantyRequest.address2;
			user['state'] = drive_data.warrantyRequest.state.toUpperCase();
			user['city'] = drive_data.warrantyRequest.city;
			user['mileage'] = drive_data.warrantyRequest.mileage;
			user['vin'] = drive_data.warrantyRequest.vin;

			var str = JSON.stringify(drive_data);
			ajax('payment',str);
		}
	});
	$('.open-card-form').click(function(){
		var block = $(this).parents('.action-block');
		block.find('.new-card-from').show();
		block.find('.choose-panel').hide();
		down(100);
	});

	/** Action back **/
	$('.back-action-block').click(function(){
		var block = $(this).parents('.action-block').prev('.action-block');

		block.find('input').prop('disabled', false).val('');
		block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('hide-button').removeClass('disabled');

		block.nextAll('.action-block').slideUp(500).find('input').prop('disabled', false).val('');
		block.nextAll('.action-block').find('.next-action-block , .next-custom-block, .next-error-block').addClass('hide-button').removeClass('disabled');

		block.prev('.action-block').nextAll('.action-block').each(function(){
			console.log($(this).attr('class'));
			if($(this).hasClass('block4')){
				$( ".input-range" ).slider( "enable" );
			}else if($(this).hasClass('block10')){
				$('.sigPad').signaturePad().clearCanvas();
				$(this).find('.button-clear').removeClass('hide-button');
				$(this).find('.sig').removeClass('disabled');
			}
		});
	});
	$('.back-error-block').click(function(){
		$('.error-block').slideUp(400);
		$('.error-block input').prop('disabled', false).val('');
		var block = $('.block3');
		block.find('input').prop('disabled', false).val('');
		block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('hide-button').removeClass('disabled');
	});
	$('.next-error-block').click(function(){
		var block = $(this).parents('.error-block');
		next_block(block,block.next('.error-block'));
		if(block.hasClass('e-block2')){
			var str = JSON.stringify({vin:drive_data.warrantyRequest.vin, email:drive_data.warrantyRequest.notifyemail});
			console.log(str);
			ajax('emailtonotify',str);
		}
	});
	$('.button-clear').click(function(){
		var block = $(this).parents('.action-block');
		block.find('.next-action-block').addClass('hide-button');
	});

	/* check inputs */
	$('.action-block input').change(function(){ check_input($(this).parents('.action-block')); });
	$('.action-block input').keyup(function(e){	check_input($(this).parents('.action-block')); });

	$('#sign1').click(function(){
		var contractUri = pdfUrl + '#page=5';
		$('.block12 iframe').attr('src',contractUri);
		$('.block12').show();
	});

});

function down(speed){
	$('html,body').animate({scrollTop: $(document).height()-$(window).height()}, speed);
}
function check_input(block){
	$.each(block.find('input:not([notrequired])'),function(){
		if(!$(this).val() || !(($(this).attr('minlength') && $(this).val().length>=$(this).attr('minlength')) || !$(this).attr('minlength')) ) $(this).addClass('input-error');
		else $(this).removeClass('input-error');
	});
	if(block.find('.input-error').length>0){
		block.find('.next-action-block , .next-custom-block').addClass('hide-button');
	}else{
		block.find('.next-action-block , .next-custom-block').removeClass('hide-button').removeClass('hide');
	}
}
function parse_data(block){
	if(block.hasClass('block1')){
		drive_data.warrantyRequest = {
			vin:block.find('input[name=vin]').val()
		};
		ajax('vehiclename','vin='+drive_data.warrantyRequest.vin);
	}else if(block.hasClass('block2')){
		drive_data.warrantyRequest.mileage = parseInt(block.find('input[name=mileage]').val().replace(/[^0-9]/g,''));
	}else if(block.hasClass('block3')){
		drive_data.warrantyRequest.zip = block.find('input[name=zip]').val();
	}else if(block.hasClass('block4')){
		var listing = plans[slider[0].values[slider[0].index]][slider[1].values[slider[1].index]][slider[2].values[slider[2].index]];
		drive_data.planId = listing.planId;
		drive_data.quoteResponseId = listing.planRequestId,
		drive_data.customerPrice = listing.cost;
		drive_data.paymentOption = {
									downpayment:listing.downpayment	,
									number_of_months:listing.numberOfMonths
									};

		$('.listing_year').text(listing.year);
		$('.listing_mileage').text(listing.mileage);
		$('.listing_mileage_full').text(listing.mileage.substring(0,listing.mileage.length-1)+',000');
		$('.listing_downpayment').text('$'+get_cent(listing.downpayment));
		$('.listing_monthlyprice').text('$'+get_cent(listing.monthlyPrice));
		$('.listing_numberofmonths').text(listing.numberOfMonths);
		$('.listing_payment_word').text(listing.numberOfMonths?"DOWN":'');

		user.monthly = get_cent(listing.monthlyPrice);
		user.dwn = get_cent(listing.downpayment);
		user.payments_nr = get_cent(listing.numberOfMonths);
		user.payments_day = '21st';

	}else if(block.hasClass('block6')){
		drive_data.warrantyRequest.first_name = block.find('input[name=first_name]').val();
		drive_data.warrantyRequest.last_name = block.find('input[name=last_name]').val();
		$('.listing_first_name').text(drive_data.warrantyRequest.first_name.toUpperCase());
	}else if(block.hasClass('block7')){
		drive_data.warrantyRequest.address1 = block.find('input[name=address1]').val();
		drive_data.warrantyRequest.address2 = block.find('input[name=address2]').val();
		drive_data.warrantyRequest.city = block.find('input[name=city]').val();
		drive_data.warrantyRequest.state = block.find('input[name=state]').val();
		drive_data.warrantyRequest.zip = block.find('input[name=zip]').val();
	}else if(block.hasClass('block8')){
		drive_data.warrantyRequest.phone = block.find('input[name=phone]').val();
		drive_data.warrantyRequest.email = block.find('input[name=email]').val();
	}else if(block.hasClass('block9')){
		drive_data.paymentOption.downpaymentCard = {
			cardholder_name: block.find('input[name=first_name]').val()+' '+block.find('input[name=last_name]').val(),
			account_number: block.find('input[name=card_number]').val(),
			expiration_month: block.find('input[name=card_month]').val(),
			expiration_year: block.find('input[name=card_year]').val(),
			cvv: block.find('input[name=card_cvv]').val()
		}
	}else if(block.hasClass('block10')){
		var sigapi = $('.sigPad').signaturePad();
		var base64ImgWithPrefix = sigapi.getSignatureImage();
		user['signature'] = base64ImgWithPrefix;
		drive_data.warrantyRequest.signature = base64ImgWithPrefix.split(',')[1];
	}else if(block.hasClass('block11')){
		if(block.find('input[name=card_number]').val()==''){
			drive_data.paymentOption.financeCard = drive_data.paymentOption.downpaymentCard;
		}else{
			drive_data.paymentOption.financeCard = {
				cardholder_name: block.find('input[name=first_name]').val()+' '+block.find('input[name=last_name]').val(),
				account_number: block.find('input[name=card_number]').val(),
				expiration_month: block.find('input[name=card_month]').val(),
				expiration_year: block.find('input[name=card_year]').val(),
				cvv: block.find('input[name=card_cvv]').val()
			}
		}
	}else if(block.hasClass('e-block2')){
		drive_data.warrantyRequest.notifyemail = block.find('input[name=email]').val();
	}
}

function ajax(f,obj){
	if(f=='verifyzip' || f=="payment"){
		$('.load').show();
		down(300);
	}

	switch(f){
		case 'plans':
			$.ajax({
				url:'https://high-quality.tech/illdriveit/warranty/plans',
				type: "GET",
				data: obj,
				dataType : "json",
				success:function(data){
					console.log(data);
					$('.load').hide();

					if(data.result=='error'){
						open_error(data.error);
					}else{
						update_calculate(data);
						$('.block4').show();
						down(1000);
					}
				}
			});
		break;
		case 'verifyzip':
			$.ajax({
	        	url:'https://high-quality.tech/illdriveit/warranty/verifyzip',
				type: "POST",
				data: obj,
				contentType: "application/json",
				dataType : "json",
				complete:function(data){
					data = data.responseJSON;
					console.log(data);

					if(!data.zipValid){
						open_error("OH NO! YOUR STATE ISN'T ELIGIBLE FOR THE FORCEFIELD YET!","WE ARE WORKING HARD TO ADD IT TO OUR PROGRAM. CLICK HERE TO BE NOTIFIED WHEN IT'S READY!",true);
					}else if(!data.mileageValid && !data.yearValid){
						open_error('OH NO! ONLY VEHICLES UNDER 3 YEARS AND/OR UNDER 36K MILES ELIGIBLE FOR THE FORCEFIELD', undefined, true);
					}else if(!data.yearValid){
						open_error('OH NO! ONLY VEHICLES UNDER 3 YEARS OLD ARE ELIGIBLE FOR THE FORCEFIELD', undefined, true);
					}else if(!data.mileageValid){
						open_error('OH NO! ONLY VEHICLES UNDER 36,000 MILES ARE ELIGIBLE FOR THE FORCEFIELD', undefined, true);
					}else{
						ajax('plans','vin='+drive_data.warrantyRequest.vin+'&mileage='+drive_data.warrantyRequest.mileage);
					}
				}
			});
		break;
		case 'payment':
			var run = false;
			$.ajax({
			    url:'https://high-quality.tech/illdriveit/warranty/purchase',
				type: "POST",
				data: obj,
				dataType : "json",
				contentType: "application/json",
				complete: function(data) {
					//Fix bug
					if(run)
						return;
					run = true;

					$('#ac_force').addClass('hidden');
					$('.load').hide();
					
					//TODO: Move into separate function?
					var res = JSON.parse(data.responseText);
					user.contract_id = res.ContractNumber;
					if($('#contractLink').attr('href').substr($('#contractLink').attr('href').length - 1) !== '0')
						$('#contractLink').attr('href', $('#contractLink').attr('href') + res.ContractNumber + '?SignedPoints=0');
					
					if(res.Success){
						$('#signaturebuttons').html('');
						if(user.state.length > 2)
							user.state = abbrState(user.state);

						//Render MBPI
						ContractManager.RequestContract('MBPI', '#contract-viewer', user, function () {

							//Generate buttons
							$('#signaturebuttons').append(
								'<div class="eachsignature">' +
									'<span class="checkicon"></span>' +
									'<h5>Start<br/>here</h5>' +
								'</div>'
							);
							if(user.state)
								$('#signaturebuttons').append(
									'<div data-uri="disclosure/' + user.state + '" class="eachsignature">' +
										'<span class="checkicon"></span>' +
										'<h5>' + user.state + '<br/>Disclosure</h5>' +
									'</div>'
								);
							if(user.monthly) {
								$('#signaturebuttons').append(
									'<div data-uri="FINC_AGR" class="eachsignature">' +
										'<span class="checkicon"></span>' +
										'<h5>Financing<br/>Agreement</h5>' +
									'</div>'
								);
								$('#signaturebuttons').append(
									'<div data-uri="DWN_PAY_APP" class="eachsignature">' +
										'<span class="checkicon"></span>' +
										'<h5>Down<br/>Payment<br/>Approval</h5>' +
									'</div>'
								);
								$('#signaturebuttons').append(
									'<div data-uri="MON_PAY_APP" class="eachsignature">' +
										'<span class="checkicon"></span>' +
										'<h5>Monthly<br/>Payment<br/>Approval</h5>' +
									'</div>'
								);
							}

							$('.eachsignature').on('click', function (e) {
								if($(this).hasClass('completed'))
									return;
								
								$(this).addClass('current');

								//Jump to sign point
								if($(this).data('uri'))
									ContractManager.RequestContract($(this).data('uri'), '#contract-viewer', user, function () {
										$('.signmarker').removeClass('hidden');
										$('#contract-viewer').scrollTop($('#contract-viewer').height())
										location.hash = '#l';
										location.hash = '#signmarker';
										down(0);
									});
								else {
									$('.signmarker').removeClass('hidden');
									$('#contract-viewer').scrollTop($('#contract-viewer').height())
									location.hash = '#l';
									location.hash = '#signmarker';
									down(0);
								}
							});

							//Handle signmarker click
							$('#contract-viewer').on('click', '.signmarker', function (e) {
								$('.eachsignature.current').removeClass('current')
									.addClass('completed');
								
								$('.signmarker').addClass('hidden');
								$('.signature img').attr('src', user['signature']);
								$('.signature').removeClass('hidden');
								$('.nextmarker').removeClass('hidden');
							});

							//Handle nextmarker click
							$('#contract-viewer').on('click', '.nextmarker', function (e) {
								$('.nextmarker').addClass('hidden');
								$('.eachsignature:not(".completed"):first').click();

								//Handle completion of all signing
								if($('#signaturebuttons').children().not('.completed').length < 1) {
									$('#ac_force').removeClass('hidden');
								}
							});
						});
						
						//Show the view
						$('.block12').show();

						//Scroll down
						down(1000);
					}else{
						open_error('OH NO! WE HAVE TROUBLE WITH YOUR CARD','CHECK HAVE YOU ENTERED<br class="space">THE CORRECT INFORMATION');
					}
				}
			});
		break;
		case 'vehiclename':
			$.ajax({
			    url:'https://high-quality.tech/illdriveit/warranty/vehiclename',
				type: "GET",
				data: obj,
				dataType : "jsonp",
				complete:function(data){
					console.log(data);
					$('.load').hide();

					var res = data.responseJSON;
					$('.listing_car_name').text(res.name);
					$('.listing_car_model').text(res.model);

					user['car_model'] = res.model;
					user['car_name'] = res.name;
				}
			});
		break;
		case 'emailtonotify':
			$.ajax({
                url:'https://high-quality.tech/illdriveit/warranty/emailtonotify',
				type: "POST",
				data:obj,
				dataType : "json",
				success:function(data){
					console.log(data);
				}
			});
		break;
	}
}
function open_error(massage,massage2,notify){
	var str = "WE ARE WORKING ON A WARRANTY FOR <br class='space'> CARS OVER 3 YEARS AND 36K MILES <br class='space'> CLICK HERE TO BE NOTIFIED ONCE IT�S LIVE!";
	$('.load').hide();
	$('.e-block1').show();
	$('.e-block1 .title-block').text(massage);
	$('.e-block1 .about-us-bottom p, .block_error1 .hide-link-about p').html((massage2==undefined?str:massage2));
	$('.e-block2 input').prop('disabled', false).val('');
	if(notify) $('.e-block1 .notify-button').removeClass('hide-button');
	else $('.e-block1 .notify-button').addClass('hide-button');
	down(1000);
}
function next_block(block,next){
	block.find('input').prop('disabled', true);
	block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('disabled');

	parse_data(block);

	if(next == undefined) block.next('.action-block').show();
	else next.show();

	down(1000);
}
function update_calculate(json){
	$('.ui-slider').slider("destroy");
	for(var i = 0; i<json.plans.length; i++){
		var year = Math.round(json.plans[i].coverageMonths/12);
		var mileage = json.plans[i].coverageMiles/1000+'K';

		if(!plans[year]) plans[year] = {};
		if(!plans[year][mileage]) plans[year][mileage] = {};

		for(var j = 0; j<json.plans[i].financeOptions.length; j++){
			var monthlyPrice = '$'+Math.round(json.plans[i].financeOptions[j].monthlyPrice);
			plans[year][mileage][monthlyPrice] = {
				'cost':json.plans[i].cost,
				"year":year,
				'mileage':mileage,
				'downpayment':json.plans[i].financeOptions[j].downpayment,
				'monthlyPrice':json.plans[i].financeOptions[j].monthlyPrice,
				'numberOfMonths':json.plans[i].financeOptions[j].numberOfMonths,
				'planId':json.plans[i].planId,'planRequestId':json.planRequestId
			};
		}
	}
	slider[0].index = 0;
	slider[1].index = 0;
	slider[2].index = 0;
	slider[0].values = get_keys(plans);
	slider[1].values = get_keys(plans[slider[0].values[0]]);
	slider[2].values = get_keys(plans[slider[0].values[0]][slider[1].values[0]]);

	update_range_values('#input-range1',slider[0].values);
	update_range_values('#input-range2',slider[1].values);
	update_range_values('#input-range3',slider[2].values);
	parse_data($('.block4'));

	$( "#input-range1" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);

			slider[0].index = calc_index(u.value,slider[0].values.length);
			slider[1].values = get_keys(plans[slider[0].values[slider[0].index]]);
			update_range_values('#input-range2',slider[1].values);
			$( "#input-range2" ).slider( "value",0);

			slider[1].index = 0;
			slider[2].values = get_keys(plans[slider[0].values[slider[0].index]][slider[1].values[slider[1].index]]);
			update_range_values('#input-range3',slider[2].values);
			$( "#input-range3" ).slider( "value",0);

			parse_data($('.block4'));
		}
	});
	$( "#input-range2" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);

			slider[1].index =  calc_index(u.value,slider[1].values.length);
			slider[2].values = get_keys(plans[slider[0].values[slider[0].index]][slider[1].values[slider[1].index]]);
			update_range_values('#input-range3',slider[2].values);
			$( "#input-range3" ).slider( "value",0);

			parse_data($('.block4'));
		}
	});
	$( "#input-range3" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);

			slider[2].index =  calc_index(u.value,slider[2].values.length);

			parse_data($('.block4'));
		}
	});
}
function update_range_values(slider,arr){
	if(arr != undefined){
		$(slider).prev('.range-values').html('');
		for (var i = 0; i < arr.length; i++){
			var sel =''; if(i==0) sel = 'class="selected"';
			$(slider).prev('.range-values').append('<span '+sel+' >'+arr[i]+'</span>');
		}
	}
	$(slider).prev('.range-values').each(function(i){
		var spans = $(this).find('span');
		var kf = 100/(spans.length-1);
		spans.each(function(i){
			$(this).css({'left':(i*kf)+'%'});
		});
	});
}
function calc_index(value,count_items){
	var rng = 100/(count_items-1);
	return ~~((value+(rng/2))/rng);
}
function get_keys(obj){
	var arr = new Array();
	for(var key in obj) arr.push(key);
	return arr;
}
function select_range_values(range,value){
	var index = calc_index(value,range.find('span').length)+1;
	range.find('span:nth-child('+index+')').addClass('selected').siblings().removeClass('selected');
}

function get_cent(num){
	if(!((num ^ 0)===num)){
		return num.toFixed(2);
	}else{
		return num;
	}
}

//From https://gist.github.com/CalebGrove/c285a9510948b633aa47
function abbrState (input, to) {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
	input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	for(i = 0; i < states.length; i++){
		if(states[i][0] == input){
			return(states[i][1]);
		}
	}    
}