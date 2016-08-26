// WARNING!
// This file is filled with ugly workarounds, hacks &
// left-overs from the previous developer who did a
// teriffic job at making the code unmaintainable.
// 
// Do NOT look directly at it without glasses,
// do NOT feed it past midnight,
// do NOT let it sleep on the couch.
//
// And for all the coders out there, I'm terribly sorry
// for putting you through this, if I were you, I would
// close this view-source tab and never look back.
//
// I don't even believe in a God, but dear lord
// please bring mercy to those who dares to look past
// this wall of text.

var	drive_data = {},
	slider = [{},{},{}],
	plans = {},
	pdfUrl,
	ajaxCooldown = 5;

var user = {
	'first_name': null,
	'last_name': null,

	'zip_code': null,
	'monthly': 0,
	'date': (new Date(Date.now())).toDateString(),

	'referrer': null
}

$(document).ready(function(){
	//Track view
	fbq('track', 'ViewContent');

	//Get referrer
	user.referrer = getParameterByName('ref');

	//Handle referrer scenarios
	if (user.referrer) {
		ReferralManager.GetValues(user.referrer, function (err, values) {
			if (err)
				return console.error('[ReferralManager] Err: ' + err);
			else if (!values)
				return console.error('[ReferralManager] Err: ' + 'UNKNOWN_REF');
			
			$('.referral-logo').attr('src', values.logo);
			$('.referral-logo-covers').attr('src', values.logo);
			$('.referral-tagline').html('<b>' + values.name + '</b>');
		});
	} else {
		$('.referral-logo').remove();
	}

	//Set payment date
	//This should be done in a more elegant way, perhaps a function
	var months = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
               "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
	var date = new Date;
    var month = date.getMonth() + 1;
    var year = (date.getFullYear() + (month > 11 ? 1 : 0));
	$('.payment-date').text(months[month%12] + ' ' + english_ordinal_suffix(date) + ', ' + year);

	//The following is a really ugly work-around, thanks previous dev </3
	//Basically fixes the check_input method by flipping it the f*** off..
	$('.block9 input').on('focusout click', function (e) {
		var fn = $('.block9 input[name=first_name]'),
			ln = $('.block9 input[name=last_name]'),
			cc = $('.block9 input[name=card_number]'),
			mnt = $('.block9 input[name=card_month]'),
			cvv = $('.block9 input[name=card_cvv]'),
			year = $('.block9 input[name=card_year]'),
			terms = $('.block9 input[name=checkbox]').is(":checked");

			if(mnt.val().length > 0 && mnt.val().length < 2)
				mnt.val('0' + mnt.val());

			if(year.val().length > 1 && year.val().length < 3)
				year.val('20' + year.val());

			if(cc.val().length < 19 || fn.val().length < 0 || ln.val().length < 0 || !terms) {
				$('.block9 .next').addClass('hide-button');
				return $('.block9 .next').addClass('hidden');
			}

			$('.block9 .next').removeClass('hide-button');
			$('.block11 .next').removeClass('hide-button');
			$('.block9 .next').removeClass('hidden');
			$('.block11 .next').removeClass('hidden');
	});
	$('.block10 input').on('focusout click', function (e) {
		var fn = $('.block10 input[name=first_name]'),
			ln = $('.block10 input[name=last_name]'),
			cc = $('.block10 input[name=card_number]'),
			mnt = $('.block10 input[name=card_month]'),
			cvv = $('.block10 input[name=card_cvv]'),
			year = $('.block10 input[name=card_year]'),
			terms = $('.block10 input[name=checkbox]').is(":checked");

			if(mnt.val().length > 0 && mnt.val().length < 2)
				mnt.val('0' + mnt.val());

			if(year.val().length > 1 && year.val().length < 3)
				year.val('20' + year.val());

			if(cc.val().length < 19 || fn.val().length < 0 || ln.val().length < 0 || !terms) {
				$('.block10 .next').addClass('hide-button');
				return $('.block10 .next').addClass('hidden');
			}

			$('.block10 .next').removeClass('hide-button');
			$('.block10 .next').removeClass('hide-button');
			$('.block10 .next').removeClass('hidden');
			$('.block10 .next').removeClass('hidden');
	});
	$('.block9 input').on('keyup', function (e) {
		var fn = $('.block9 input[name=first_name]'),
			ln = $('.block9 input[name=last_name]'),
			cc = $('.block9 input[name=card_number]'),
			mnt = $('.block9 input[name=card_month]'),
			cvv = $('.block9 input[name=card_cvv]'),
			year = $('.block9 input[name=card_year]'),
			terms = $('.block9 input[name=checkbox]').is(":checked");

			if(cc.val().length < 19 || fn.val().length < 0 || ln.val().length < 0 || !terms || cvv.val().length < 3) {
				$('.block9 .next').addClass('hide-button');
				return $('.block9 .next').addClass('hidden');
			}
	});
	$('.block10 input').on('keyup', function (e) {
		var fn = $('.block10 input[name=first_name]'),
			ln = $('.block10 input[name=last_name]'),
			cc = $('.block10 input[name=card_number]'),
			mnt = $('.block10 input[name=card_month]'),
			cvv = $('.block10 input[name=card_cvv]'),
			year = $('.block10 input[name=card_year]'),
			terms = $('.block10 input[name=checkbox]').is(":checked");

			if(cc.val().length < 19 || fn.val().length < 0 || ln.val().length < 0 || !terms || cvv.val().length < 3) {
				$('.block10 .next').addClass('hide-button');
				return $('.block10 .next').addClass('hidden');
			}
	});

	//Handle enter btn
	$(document).keypress(function(e) {
		if(e.which == 13) {
			//$(".next-action-block").not(".disabled, .hide-button, .hidden").click();
			//$(".next-custom-block").not(".disabled, .hide-button, .hidden").click();
		}
	});

	//Handle clear button click
	$('#clear-btn').on('click', function () {
		$('.sigPad').signaturePad().clearCanvas();
		$('.sig').removeClass('no-before');
	});

	$("input[name=card_number]").mask("9999-9999-9999-9999");//{placeholder:'XXXX-XXXX-XXXX-XXXX'}
	$("input[name=phone]").mask('(000) 000-0000');

	//Really ugly way to make sure a number input only allows numbers
	$('.input-number').keyup(function(){
		if($(this).val().replace(/[^0-9]/g,'')!=$(this).val())
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});
	$('.input-letters').on('keyup', function(e) {
		var val = $(this).val();
		if (val.match(/[^a-zA-Z]/g)) {
			$(this).val(val.replace(/[^a-zA-Z]/g, ''));
		}
	});

	$('.sigPad').signaturePad({
		drawOnly:true,
		bgColour:'white',
		penWidth:6,
		lineTop:200,
		onDrawEnd:function(){
			setTimeout(function(){check_input($('.sigPad').parents('.action-block'))},0);
			$('.sig').addClass('no-before');
			//TODO: Remove "sign here" label.
		}
	});

	/** Actions **/
	$('.next-action-block').click(function(){
		ajaxCooldown = 5;
		//Handle completion of flow
		if ($(this).hasClass('flow-completion'))
			handelFlowComplete();

		var block = $(this).parents('.action-block');
		next_block(block);

		if (block.hasClass('block9')) {
			parse_data(block);
		} else if(block.hasClass('block4')){
			$(".input-range" ).slider("disable");
		}else if(block.hasClass('block11')){
			block.find('.button-clear').addClass('hide-button');
			block.find('.sig').addClass('disabled');
		}else if (block.hasClass('block10')) {
			$('.block11').removeClass('hide');
		}
	});
	$('.next-custom-block').click(function(){
		ajaxCooldown = 5;
		var block = $(this).parents('.action-block');
		block.find('input').prop('disabled', true);
		block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('disabled');
		parse_data(block);
		if(block.hasClass('block3')){
			var str = JSON.stringify({zip:drive_data.warrantyRequest.zip, mileage:drive_data.warrantyRequest.mileage, vin:drive_data.warrantyRequest.vin.toUpperCase()});
			ajax('verifyzip',str);

		} else if(block.hasClass('block11')){
			//Save data to user object in-case it's changed since last time.
			console.log(drive_data.warrantyRequest);
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
			ajax('payment', str);
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

		block.find('input').removeAttr("disabled");
		$('.submit-block input').removeAttr("disabled");
		block.find('.next-action-block , .next-custom-block, .next-error-block')/*.addClass('hide-button')*/.removeClass('disabled');

		block.nextAll('.action-block').slideUp(500).find('input').prop('disabled', false)/*.val('')*/;
		block.nextAll('.action-block').find('.next-action-block , .next-custom-block, .next-error-block')/*.addClass('hide-button')*/.removeClass('disabled');

		block.prev('.action-block').nextAll('.action-block').each(function(){
			console.log($(this).attr('class'));
			if($(this).hasClass('block4')){
				$( ".input-range" ).slider( "enable" );
			}else if($(this).hasClass('block11')){
				//$('.sigPad').signaturePad().clearCanvas();
				$(this).find('.button-clear').removeClass('hide-button');
				$(this).find('.sig').removeClass('disabled');
			}
		});
	});
	$('.back-error-block').click(function(){
		$('.error-block').slideUp(400);
		$('.error-block input').prop('disabled', false)/*.val('')*/;
		var block = $('.block3');
		block.find('input').prop('disabled', false)/*.val('')*/;
		block.find('.next-action-block , .next-custom-block, .next-error-block').removeClass('disabled');
		$('.sigPad .next-custom-block').removeClass('disabled');
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
});

$('a[href*=#]').on('click', function (event) {     
	if ($(this).attr('href').indexOf('/') !== -1)
		return;

    event.preventDefault();

	try {
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
		},
			500,
			'easeInOutCubic'
		);
	} catch (ex) {}
});

function down (speed){
	$('html, body').animate({ 
		scrollTop: $(document).height()-$(window).height()
	},
		speed, 
		'easeInOutCubic'
	);
}

function check_input(block){
	$.each(block.find('input:not([notrequired])'),function(){
		//Handle CC and Agree
		if($(this).parent().hasClass('card-info-block'))
			return;
		else if($(this).parent().hasClass('agreediv'))
			return;

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
			vin: block.find('input[name=vin]').val().toUpperCase()
		};
		ajax('vehiclename','vin='+drive_data.warrantyRequest.vin);
	}else if(block.hasClass('block2')){
		drive_data.warrantyRequest.mileage = parseInt(block.find('input[name=mileage]').val().replace(/[^0-9]/g,''));
	}else if(block.hasClass('block3')){
		drive_data.warrantyRequest.zip = block.find('input[name=zip]').val();
		$('.block7 input[name=zip]').val(drive_data.warrantyRequest.zip);
	}else if(block.hasClass('block4')){
		var listing = plans[slider[0].values[slider[0].index]][slider[1].values[slider[1].index]][slider[2].values[slider[2].index]];
		drive_data.planId = listing.planId;
		drive_data.quoteResponseId = listing.planRequestId,
		drive_data.customerPrice = listing.cost;
		drive_data.paymentOption = {
									downpayment:listing.downpayment	,
									monthly_payment: listing.monthlyPrice,
									number_of_months:listing.numberOfMonths
									};

		$('.listing_year').text(listing.year);
		$('.listing_mileage').text(listing.mileage);
		$('.listing_mileage_full').text(listing.mileage.substring(0,listing.mileage.length-1)+',000');
		$('.listing_downpayment').text('$'+ get_cent(listing.downpayment));
		$('.listing_monthlyprice').text('$'+ get_cent(listing.monthlyPrice));
		$('.total-payment .amount').text(Math.round((listing.downpayment + (listing.monthlyPrice * listing.numberOfMonths))).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }));
		drive_data.warrantyRequest.coverage_years = listing.numberOfMonths;
		drive_data.warrantyRequest.coverage_miles = parseInt(listing.mileage.replace('K', '000'));
		$('.listing_numberofmonths').text(listing.numberOfMonths);
		$('.listing_payment_word').text(listing.numberOfMonths?"DOWN":'');

		user.monthly = get_cent(listing.monthlyPrice);
		user.dwn = get_cent(listing.downpayment);
		user.payments_nr = get_cent(listing.numberOfMonths);
		user.payments_day = '21st';

	}else if(block.hasClass('block6')){
		drive_data.warrantyRequest.first_name = block.find('input[name=first_name]').val();
		drive_data.warrantyRequest.last_name = block.find('input[name=last_name]').val();

		user['first_name'] = drive_data.warrantyRequest.first_name;
		user['last_name'] = drive_data.warrantyRequest.last_name;
		$('.listing_first_name').text(drive_data.warrantyRequest.first_name.toUpperCase());
	}else if(block.hasClass('block7')){
		drive_data.warrantyRequest.address1 = block.find('input[name=address1]').val();
		drive_data.warrantyRequest.address2 = block.find('input[name=address2]').val();
		drive_data.warrantyRequest.city = block.find('input[name=city]').val();
		drive_data.warrantyRequest.state = block.find('input[name=state]').val();
		drive_data.warrantyRequest.zip = block.find('input[name=zip]').val();

		user['state'] = drive_data.warrantyRequest.state.toUpperCase();
		user['zip_code'] = drive_data.warrantyRequest.zip;
		user['address'] = drive_data.warrantyRequest.address1;
		user['address2'] = drive_data.warrantyRequest.address2;
		user['city'] = drive_data.warrantyRequest.city;
	}else if(block.hasClass('block8')){
		drive_data.warrantyRequest.phone = block.find('input[name=phone]').val().replace(/[^0-9\.]+/g, '');
		drive_data.warrantyRequest.email = block.find('input[name=email]').val();

		user['email'] = drive_data.warrantyRequest.email;
		user['phone'] = drive_data.warrantyRequest.phone;
	}else if(block.hasClass('block9')){
		drive_data.paymentOption.downpaymentCard = {
			cardholder_name: block.find('input[name=first_name]').val()+' '+block.find('input[name=last_name]').val(),
			account_number: block.find('input[name=card_number]').val(),
			expiration_month: block.find('input[name=card_month]').val(),
			expiration_year: block.find('input[name=card_year]').val(),
			cvv: block.find('input[name=card_cvv]').val()
		}
		drive_data.paymentOption.financeCard = drive_data.paymentOption.downpaymentCard;
	}else if(block.hasClass('block11')){
		var sigapi = $('.sigPad').signaturePad();
		var base64ImgWithPrefix = sigapi.getSignatureImage();
		user['signature'] = base64ImgWithPrefix;
		drive_data.warrantyRequest.signature = base64ImgWithPrefix.split(',')[1];
	}else if(block.hasClass('block10')){
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

function ajax(f, obj){
	if(f=='verifyzip' || f=="payment"){
		$('.load').show();
		down(300);
	}

	switch (f) {
		case 'plans':
			$.ajax({
				url:'https://api.illdrive.it/api/warranty/plans',
				type: "GET",
				data: obj,
				dataType : "json",
				processData: false,
				success: function(data) {
					$('.load').hide();

					if(data.result=='error'){
						open_error(data.error);
						ga('send', {
							hitType: 'event',
							eventCategory: 'PLANSError',
							eventAction: 'enter',
					  		eventLabel: drive_data.warrantyRequest.vin
						});
					} else {
						ga('send', {
							hitType: 'event',
							eventCategory: 'PLANSSuccess',
							eventAction: 'enter',
					  		eventLabel: drive_data.warrantyRequest.vin
						});
						update_calculate(data);
						$('.block4').show();
						down(1000);
					}

					ajaxCooldown = 5;
				},
				error: function (jqXHR, txtSts, err) {
					if(!ajaxCooldown)
						return open_error('Something is wrong on our end!', 'It looks like something went wrong on out end :()', false);
					
					ajaxCooldown--;
					notie.alert(3, 'Something happened, retrying..', 2.5);
					console.error(err);
					ajax(f, obj);
				}
			});
		break;
		case 'verifyzip':
			$.ajax({
	        	url:'https://api.illdrive.it/api/warranty/verifyzip',
				type: "POST",
				data: obj,
				contentType: "application/json",
				dataType : "json",
				processData: false,
				complete: function(data) {
					ajaxCooldown = 5;
					try {
						data = data.responseJSON;

						if ($('.listing_car_name').text() === 'VEHICLE') {
							open_error('OH NO! YOUR VIN IS INVALID', 'IT LOOKS LIKE YOU HAVE ENTERED AN INCORRECT VIN', false);
						} else if(!data.zipValid){
							open_error("OH NO! YOUR STATE ISN'T ELIGIBLE FOR THE FORCEFIELD YET!","WE ARE WORKING HARD TO ADD IT TO OUR PROGRAM. CLICK HERE TO BE NOTIFIED WHEN IT'S READY!", true);
							ga('send', {
								hitType: 'event',
								eventCategory: 'ZIPInvalid',
								eventAction: 'enter',
						  		eventLabel: drive_data.warrantyRequest.vin
							});
						} else if(!data.mileageValid && !data.yearValid){
							open_error('OH NO! ONLY VEHICLES UNDER 10 YEARS AND/OR UNDER 60K MILES ELIGIBLE FOR THE FORCEFIELD', undefined, true);
						} else if(!data.yearValid){
							open_error('OH NO! ONLY VEHICLES UNDER 10 YEARS OLD ARE ELIGIBLE FOR THE FORCEFIELD', undefined, true);
						} else if(!data.mileageValid){
							open_error('OH NO! ONLY VEHICLES UNDER 60,000 MILES ARE ELIGIBLE FOR THE FORCEFIELD', undefined, true);
						} else{
							if (typeof data.state !== undefined && data.state)
								$('.block7 input[name=state]').val(data.state);
							if (typeof data.city !== undefined && data.city)
								$('.block7 input[name=city]').val(data.city);
							
							ga('send', {
								hitType: 'event',
								eventCategory: 'ZIPSuccess',
								eventAction: 'enter',
						  		eventLabel: drive_data.warrantyRequest.vin
							});
							ajax('plans','vin='+drive_data.warrantyRequest.vin+'&mileage='+drive_data.warrantyRequest.mileage);
						}
					} catch (ex) {
						notie.alert(3, 'Something happened, retrying..', 2.5);
						console.error(ex);
						ajax(f, obj);
					}
				},
				error: function (jqXHR, txtSts, err) {
					if(!ajaxCooldown)
						return open_error('Something is wrong on our end!', 'It looks like something went wrong on out end :()', false);
					
					ajaxCooldown--;
					notie.alert(3, 'Something happened, retrying..', 2.5);
					console.error(err);
					ajax(f, obj);
				}
			});
		break;
		case 'payment':
			var run = false;
			$.ajax({
			    url:'https://api.illdrive.it/api/warranty/purchase',
				type: "POST",
				data: obj,
				dataType : "json",
				contentType: "application/json",
				processData: false,
				complete: function(data) {
					ajaxCooldown = 5;
					//Fix bug
					if(run)
						return;
					run = true;

					//Track purchase
					fbq('track', 'Purchase', {
						'value': Math.round((listing.downpayment + (listing.monthlyPrice * listing.numberOfMonths))),
						'currency': 'USD'
					});
					ga('send', {
						hitType: 'event',
						eventCategory: 'PURCHASESuccess',
						eventAction: 'enter',
				  		eventLabel: drive_data.warrantyRequest.vin
					});
					ga('ecommerce:addTransaction', {
					  'id': res.ContractNumber,
					  'affiliation': 'Forcefield',
					  'revenue': Math.round((listing.downpayment + (listing.monthlyPrice * listing.numberOfMonths))),
					  'tax': 0
					});
					ga('ecommerce:send');

					$('#ac_force').addClass('hidden');
					$('.load').hide();

					//TODO: Move into separate function?
					if (!res)
						return open_error(ERROR_MESSAGES['invalid_credit_card'].title, ERROR_MESSAGES['invalid_credit_card'].subtitle, true);

					var res = JSON.parse(data.responseText);
					user.contract_id = res.ContractNumber;
					if($('#contractLink').attr('href').substr($('#contractLink').attr('href').length - 1) !== '0')
						$('#contractLink').attr('href', $('#contractLink').attr('href') + res.ContractNumber + '?SignedPoints=999');

					if(res.Success){
						$('#signaturebuttons').html('');

						try {
							if(user.state.length > 2)
								user.state = abbrState(user.state);
						} catch(ex) {
							return open_error(ERROR_MESSAGES['invalid_credit_card'].title, ERROR_MESSAGES['invalid_credit_card'].subtitle, true);
						}

						//Render MBPI
						ContractManager.RequestContract('MBPI', '#contract-viewer', user, function () {

							//Generate buttons
							$('#signaturebuttons').append(
								'<div class="eachsignature">' +
									'<span class="checkicon"></span>' +
									'<h5>Start<br/>here</h5>' +
								'</div>'
							);


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

							$('.eachsignature').on('click touchstart', function (e) {
								if($(this).hasClass('completed'))
									return;

								$(this).addClass('current');

								//Jump to sign point
								if($(this).data('uri'))
									ContractManager.RequestContract($(this).data('uri'), '#contract-viewer', user, function (err, res) {
										if (err) {
											$('.eachsignature.current').removeClass('current').addClass('completed');
											$('.eachsignature:not(".completed"):first').click();

											//Handle completion of all signing
											if($('#signaturebuttons').children().not('.completed').length < 1) {
												$('#ac_force').removeClass('hidden');
											}
											return;
										}

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
							$('#contract-viewer').on('click touchstart', '.signmarker', function (e) {
								$('.eachsignature.current').removeClass('current')
									.addClass('completed');

								$('.signmarker').addClass('hidden');
								$('.signature img').attr('src', user['signature']);
								$('.signature').removeClass('hidden');
								$('.nextmarker').removeClass('hidden');
							});

							//Handle nextmarker click
							$('#contract-viewer').on('click touchstart', '.nextmarker', function (e) {
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
					} else{
						return open_error(ERROR_MESSAGES['invalid_credit_card'].title, ERROR_MESSAGES['invalid_credit_card'].subtitle, true);
					}
				},
				error: function (jqXHR, txtSts, err) {
					if(!ajaxCooldown)
						return open_error('Something is wrong on our end!', 'It looks like something went wrong on out end :()', false);
					
					ajaxCooldown--;
					notie.alert(3, 'Something happened, retrying..', 2.5);
					console.error(err);
					ajax(f, obj);
				}
			});
		break;
		case 'vehiclename':
			$.ajax({
			    url:'https://api.illdrive.it/api/warranty/vehiclename',
				type: "GET",
				data: obj,
				dataType : "json",
				processData: false,
				complete: function(data) {
					ajaxCooldown = 5;
					try {
						//Track InitiateCheckout
						fbq('track', 'InitiateCheckout');
						ga('send', {
						  	hitType: 'event',
						  	eventCategory: 'VIN',
						  	eventAction: 'enter',
						  	eventLabel: drive_data.warrantyRequest.vin
						});

						$('.load').hide();

						var res = data.responseJSON;
						$('.listing_car_name').text(res.name);
						$('.listing_car_model').text(res.model);

						if (res.name !== 'VEHICLE')
							ga('send', {
								hitType: 'event',
								eventCategory: 'VINSuccess',
								eventAction: 'enter',
						  		eventLabel: drive_data.warrantyRequest.vin
							});

						user['car_model'] = res.model;
						user['car_name'] = res.name;
					} catch (ex) {
						notie.alert(3, 'Something happened, retrying..', 2.5);
						console.error(ex);
						ajax(f, obj);
					}
				},
				error: function (jqXHR, txtSts, err) {
					if(!ajaxCooldown)
						return open_error('Something is wrong on our end!', 'It looks like something went wrong on out end :()', false);
					
					ajaxCooldown--;
					notie.alert(3, 'Something happened, retrying..', 2.5);
					console.error(err);
					ajax(f, obj);
				}
			});
		break;
		case 'emailtonotify':
			$.ajax({
                url:'https://api.illdrive.it/api/warranty/emailtonotify',
				type: "POST",
				data:obj,
				dataType : "json",
				success:function(data){
					ajaxCooldown = 5;
					console.log(data);
				},
				error: function (jqXHR, txtSts, err) {
					if(!ajaxCooldown)
						return open_error('Something is wrong on our end!', 'It looks like something went wrong on out end :()', false);
					
					ajaxCooldown--;
					notie.alert(3, 'Something happened, retrying..', 2.5);
					console.error(err);
					ajax(f, obj);
				}
			});
		break;
	}
}
function open_error(massage, massage2, notify){
	var str = "WE ARE WORKING ON A WARRANTY FOR <br class='space'> CARS OVER 10 YEARS AND 60K MILES <br class='space'> CLICK HERE TO BE NOTIFIED ONCE IT�S LIVE!";
	$('.load').hide();
	$('.e-block1').show();
	$('.e-block1 .title-block').text(massage);
	$('.e-block1 .about-us-bottom p, .block_error1 .hide-link-about p').html((massage2 == undefined ? str : massage2));
	$('.e-block2 input').prop('disabled', false)/*.val('')*/;
	if(notify) $('.e-block1 .notify-button').removeClass('hide-button');
	else $('.e-block1 .notify-button').addClass('hide-button');
	down(1000);
}
function next_block(block,next){
	block.find('input').prop('disabled', true);
	block.find('.next-action-block , .next-custom-block, .next-error-block').addClass('disabled');

	if (block.hasClass('block9') && drive_data.paymentOption.number_of_months == 0) {
		//Track payment info
		fbq('track', 'AddPaymentInfo');

		$('.block10 .img-circle.next-action-block.visible-true').click();
		return down(500);
	}

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

	update_range_values('#input-range1', slider[0].values);
	update_range_values('#input-range2', slider[1].values);
	update_range_values('#input-range3', slider[2].values);
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
function update_range_values(slider, arr){
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

//Handle completion of the form
function handelFlowComplete() {
	//Track completed
	fbq('track', 'CompleteRegistration');

	return $.ajax({
		url:'https://api.illdrive.it/api/warranty/flow/completed',
		type: "POST",
		data: user,
		dataType: "json",
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function english_ordinal_suffix(dt) {
	return dt.getDate()+(dt.getDate() % 10 == 1 && dt.getDate() != 11 ? 'st' : (dt.getDate() % 10 == 2 && dt.getDate() != 12 ? 'nd' : (dt.getDate() % 10 == 3 && dt.getDate() != 13 ? 'rd' : 'th'))); 
}

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function(illdriveit, $, undefined) {
    if (!window.console) window.console = {};
    if (!consoleLog) consoleLog = function(){};

    //Private var
    var console_log = console.log;  

    //Public methods
	illdriveit.Logging = function logging(enable) {
		localStorage.setItem('logging', enable);

		if (enable)
			console.log = console_log;
		else
			console.log = Rollbar.debug;
	}

}(window.illdriveit = window.illdriveit || {}, jQuery));

//Disable console.log
if (localStorage.getItem('logging') !== "true")
	try {
		console.clear();
		consoleLog('%cHowdy Developer!%c Run illdriveit.Logging(true) to enable loggin\' :)', 'color: green', 'color: black');
		consoleLog('Also, you should totally buy my album... If I had one for sale that is.');
		consoleLog('//not Filiph Sandström, but I\'ve heard that guy\'s awesome.');
		illdriveit.Logging(false);
	} catch (ex) {}


var ERROR_MESSAGES = {
	'invalid_credit_card': {
		'title': 'OH NO! WE HAVE TROUBLE WITH YOUR CARD',
		'subtitle': 'Click the green back button to make sure you\'ve entered the right information. If you\'re still having problems, call us at 800-325-7484',
	}
}