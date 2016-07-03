var plans = {},slider1_values,slider2_values,slider3_values,slider1_index,slider2_index,slider3_index,block_index=1;
var notify_email;
var drive = {
			"warrantyRequest":{},
			"paymentOption":{}
			};
var error = false;
$(document).ready(function(){
	$('.button-next').addClass('hide-button');
	$('.sigPad').signaturePad({
		drawOnly:true,
		bgColour:'transparent',
		penWidth:4,
		lineTop:200,
		onDrawEnd:function(){
			$('.sigPad .button-next').removeClass('hide-button');
			setTimeout(function(){
				drive.signature = btoa($('.sigPad .output').val());
			},100);
		}
	});
	$('.sigPad .button-clear').click(function(){
		$('.sigPad .button-next').addClass('hide-button');
	})

	$('.action-block input').change(function(){
		var block = $(this).parents('.action-block');
		$.each(block.find('input'),function(){
			if($(this).val()=='') $(this).addClass('input-error');
			else $(this).removeClass('input-error');
		});
		if(block.find('.input-error').length>0){
			block.find('.button-next').addClass('hide-button');
		}else{
			block.find('.button-next').removeClass('hide-button');
		}
	});
	$('.button-next').click(function(){
		var block = $(this).parents('.action-block');
		block.find('input').prop('disabled', true);

		if(block.hasClass('block1')){
			drive.warrantyRequest.vin = block.find('input[name=vin]').val();
			block_index = 2;
		}else if(block.hasClass('block2')){
			drive.warrantyRequest.mileage = block.find('input[name=mileage]').val();
			block_index = 3;
		}else if(block.hasClass('block3')){
			drive.warrantyRequest.zip = block.find('input[name=zip]').val();

			get_zip(drive.warrantyRequest.vin,drive.warrantyRequest.mileage,drive.warrantyRequest.zip);
			return false;
		}else if(block.hasClass('block4')){
			$( ".input-range" ).slider( "disable" );
			block_index = 6;
		}else if(block.hasClass('block6')){
			drive.warrantyRequest.first_name = block.find('input[name=first_name]').val();
			drive.warrantyRequest.last_name = block.find('input[name=last_name]').val();
			block_index = 7;
		}else if(block.hasClass('block7')){
			drive.warrantyRequest.address1 = block.find('input[name=address1]').val();
			drive.warrantyRequest.address2 = block.find('input[name=address2]').val();
			drive.warrantyRequest.city = block.find('input[name=city]').val();
			drive.warrantyRequest.state = block.find('input[name=state]').val();
			drive.warrantyRequest.zip = block.find('input[name=zip]').val();
			block_index = 8;
		}else if(block.hasClass('block8')){
			drive.warrantyRequest.phone = block.find('input[name=phone]').val();
			drive.warrantyRequest.email = block.find('input[name=email]').val();
			block_index = 9;
		}else if(block.hasClass('block9')){
			drive.paymentOption.downpaymentCard = {
				account_number: block.find('input[name=cart_number]').val(),
				expiration_month: block.find('input[name=cart_month]').val(),
				expiration_year: block.find('input[name=cart_year]').val(),
				cardholder_name: block.find('input[name=cart_ccv]').val()
			}
			block_index = 10;
		}else if(block.hasClass('block10')){
			$('.sigPad .pad').css('pointer-events','none');
			$('.sigPad .button-clear').addClass('hide-button');
		}
		
		block.next('.action-block').show();
		$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
	});
	$('.button-back').click(function(){
		var block = $(this).parents('.action-block');
		block.slideUp(400).find('input').prop('disabled', false).val('');
		block.find('.button-next').addClass('hide-button');

		block.nextAll('.action-block').slideUp(400).find('input').prop('disabled', false).val('');
		block.nextAll('.action-block').find('.button-next').addClass('hide-button');

		block.prev('.action-block').find('input').prop('disabled', false).val('');
		block.prev('.action-block').find('.button-next').addClass('hide-button');

		if(block.prev('.action-block').hasClass('block4')){
			$( ".input-range" ).slider( "enable" );
		}else if(block.prev('.action-block').hasClass('block4')){
			$('.sigPad').css('pointer-events','auto');
		}
		block.nextAll('.action-block').each(function(){
			if($(this).hasClass('block4')){
				$( ".input-range" ).slider( "enable" );
			}else if($(this).hasClass('block10')){
				$('.sigPad').css('pointer-events','auto');
				$('.sigPad .button-clear').removeClass('hide-button');
			}
		});
	});
	$('.back-notify').click(function(){
		$('.block_error').slideUp(400);
		$('.block'+block_index).find('input').prop('disabled', false);
	});
	$('.notify-button').click(function(){
		var block = $(this).parents('.block_error');
		block.find('input').prop('disabled', true);
		
		if(block.hasClass('block_error4')){
			
			$.ajax({
				url:'https://high-quality.tech/illdriveit/warranty/verifyzip',
				type: "POST",
				data:{'email':JSON.stringify(block.find('input[name=email]').val()), 'vin':JSON.stringify(drive.warrantyRequest.vin)},
				dataType : "json",
				success:function(data){
					block.next('.block_error').show();
					$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
				}
			});	
			return false;
		}
		block.next('.block_error').show();
		$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
	});
});
/* 5FRYD4H43GB017942 1000 */
function get_plans(vin,mil){
	console.log('ajax');
	$.ajax({
		url:'https://high-quality.tech/illdriveit/warranty/plans',
		type: "GET",
		data: 'vin='+vin+'&mileage='+mil,
		dataType : "jsonp",
		success:function(data){
			console.log(data);
			if(data.result=='error'){
				open_error(data.error);
			}else{
				update_calculate(data);
				$('.load').hide();
				$('.block4').show();
				$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
			}
		}
	});	
}
/* 98001 1000 5FRYD4H43GB017942  */
function get_zip(vin,mil,zip){
	open_load();
	console.log('ajax');
	$.ajax({
		url:'https://high-quality.tech/illdriveit/warranty/verifyzip', //'http://stest.te.ua/verifyzip.php',
		type: "POST",
		data:{'zip':JSON.stringify(zip), 'mileage':JSON.stringify(mil),'vin':JSON.stringify(vin)},
		dataType : "json",
		success:function(data){
			console.log(data);
			
			if(!data.zipValid){
				open_error('zipValid : false',true);	
			}else if(!data.mileageValid){
				open_error('mileageValid : false');	
			}else{
				get_plans(drive.warrantyRequest.vin,drive.warrantyRequest.mileage);
			}
		}
	});	
}

function obj_length(obj){
	var i = 0;
	for(var key in obj) i++;
	return i;
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
function select_range_values(range,value){
	var index = get_index(value,range.find('span').length)+1;
	range.find('span:nth-child('+index+')').addClass('selected').siblings().removeClass('selected');
}
function get_index(value,count_items){
	var rng = 100/(count_items-1);
	return ~~((value+(rng/2))/rng);
}
function get_keys(obj){
	var arr = new Array();
	for(var key in obj) arr.push(key);
	return arr;
}
function update_listing(){
	$('.block4 .button-next').removeClass('hide-button');

	var listing = plans[slider1_values[slider1_index]][slider2_values[slider2_index]][slider3_values[slider3_index]];
	$('.listing_year').text(listing.year);
	$('.listing_mileage').text(listing.mileage);
	$('.listing_mileage_full').text(listing.mileage.substring(0,listing.mileage.length-1)+',000');
	$('.listing_downpayment').text('$'+listing.downpayment);
	$('.listing_monthlyprice').text('$'+listing.monthlyPrice);
	$('.listing_numberofmonths').text(listing.numberOfMonths);

	drive.planId = listing.planId;
	drive.customerPrice = listing.planId;
	drive.paymentOption.downpayment = listing.downpayment;
	drive.number_of_months = listing.numberOfMonths;
}
function update_calculate(json){
	$('.ui-slider').slider("destroy");
	for(var i = 0; i<json.plans.length; i++){
		var year = Math.round(json.plans[i].coverageMonths/12);
		var mileage = json.plans[i].coverageMiles/1000+'k';

		if(!plans[year]) plans[year] = {};
		if(!plans[year][mileage]) plans[year][mileage] = {};
			
		for(var j = 0; j<json.plans[i].financeOptions.length; j++){
			var monthlyPrice = '$'+Math.round(json.plans[i].financeOptions[j].monthlyPrice);
			plans[year][mileage][monthlyPrice] = {'cost':json.plans[i].cost,"year":year,'mileage':mileage,'downpayment':json.plans[i].financeOptions[j].downpayment,'monthlyPrice':json.plans[i].financeOptions[j].monthlyPrice,'numberOfMonths':json.plans[i].financeOptions[j].numberOfMonths,'planId':json.plans[i].planId};
		}	
	}
	slider1_index = 0;
	slider1_values = get_keys(plans);
	slider2_index = 0;
	slider2_values = get_keys(plans[slider1_values[0]]);
	slider3_index = 0;
	slider3_values = get_keys(plans[slider1_values[0]][slider2_values[0]]);
	update_range_values('#input-range1',slider1_values);
	update_range_values('#input-range2',slider2_values);
	update_range_values('#input-range3',slider3_values);
	update_listing();

	$( "#input-range1" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);

			slider1_index = get_index(u.value,slider1_values.length);
			slider2_values = get_keys(plans[slider1_values[slider1_index]]);
			update_range_values('#input-range2',slider2_values);
			$( "#input-range2" ).slider( "value",0);

			slider2_index = 0;
			slider3_values = get_keys(plans[slider1_values[slider1_index]][slider2_values[slider2_index]]);
			update_range_values('#input-range3',slider3_values);
			$( "#input-range3" ).slider( "value",0);

			update_listing();
		}
	});
	$( "#input-range2" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);
			slider2_index =  get_index(u.value,slider2_values.length);
			slider3_values = get_keys(plans[slider1_values[slider1_index]][slider2_values[slider2_index]]);
			update_range_values('#input-range3',slider3_values);	
			$( "#input-range3" ).slider( "value",0);

			update_listing();
		}
	});
	$( "#input-range3" ).slider({
		slide:function(e,u){
			select_range_values($(this).prev('.range-values'),u.value);
			slider3_index =  get_index(u.value,slider3_values.length);

			update_listing();
		}
	});
}
function open_load(){
	$('.load').show();
	$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
}
function open_error(massage,notify){
	$('.load').hide();
	$('.block_error1').show();
	$('.block_error1 .title-block').text(massage);
	if(notify==true){
		$('.block_error1 .notify-button').removeClass('hide-button');
	}else{
		$('.block_error1 .notify-button').addClass('hide-button');
	}
	$('body').animate({scrollTop: $(document).height()-$(window).height()}, 1000);
}
