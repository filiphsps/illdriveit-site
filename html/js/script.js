
var block_select = 0;
var block_array =  ['.block1','.block2','.block3',
					'.block4','.block5','.block6',
					'.block7','.block8','.block9',
					'.block10','.block11','.block12'];
$(document).ready(function(){
	$('.button-next').addClass('hide-button');
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
		
	});
	var json = {"plans":[{"planId":"c4711ccb-821f-4e87-b2aa-322fccef612a","cost":1705,"coverageMonths":24,"coverageMiles":40000,"financeOptions":[{"downpayment":1705,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":178,"numberOfMonths":6,"monthlyPrice":267},{"downpayment":181.5,"numberOfMonths":12,"monthlyPrice":136.13}]},{"planId":"1f4c178e-2f64-4ae1-89d1-95ae9634a9ab","cost":2070,"coverageMonths":48,"coverageMiles":75000,"financeOptions":[{"downpayment":2070,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":218,"numberOfMonths":12,"monthlyPrice":163.5},{"downpayment":224,"numberOfMonths":18,"monthlyPrice":112},{"downpayment":232,"numberOfMonths":24,"monthlyPrice":87}]},{"planId":"fa955411-be46-47c4-8501-d3c467631751","cost":2366,"coverageMonths":48,"coverageMiles":100000,"financeOptions":[{"downpayment":2366,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":247.61,"numberOfMonths":12,"monthlyPrice":185.7},{"downpayment":253.61,"numberOfMonths":18,"monthlyPrice":126.81},{"downpayment":261.61,"numberOfMonths":24,"monthlyPrice":98.1}]},{"planId":"afa3b9ac-6ca6-4087-9994-888e59592a10","cost":2131,"coverageMonths":60,"coverageMiles":75000,"financeOptions":[{"downpayment":2131,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":224.11,"numberOfMonths":12,"monthlyPrice":168.08},{"downpayment":230.11,"numberOfMonths":18,"monthlyPrice":115.06},{"downpayment":238.11,"numberOfMonths":24,"monthlyPrice":89.29}]},{"planId":"b7d3e927-13eb-4dc7-b3e6-4aeae2a180ea","cost":2447,"coverageMonths":60,"coverageMiles":100000,"financeOptions":[{"downpayment":2447,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":255.7,"numberOfMonths":12,"monthlyPrice":191.78},{"downpayment":261.7,"numberOfMonths":18,"monthlyPrice":130.86},{"downpayment":269.7,"numberOfMonths":24,"monthlyPrice":101.14}]},{"planId":"8735ef43-d27b-4bd2-b1fe-0d7bbefbeb10","cost":1842,"coverageMonths":36,"coverageMiles":60000,"financeOptions":[{"downpayment":1842,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":195.2,"numberOfMonths":12,"monthlyPrice":146.4},{"downpayment":198.7,"numberOfMonths":15,"monthlyPrice":119.22},{"downpayment":201.2,"numberOfMonths":18,"monthlyPrice":100.6}]},{"planId":"94a20b77-0abb-416b-b488-3e0c5b9e9680","cost":1944,"coverageMonths":36,"coverageMiles":75000,"financeOptions":[{"downpayment":1944,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":205.4,"numberOfMonths":12,"monthlyPrice":154.05},{"downpayment":208.9,"numberOfMonths":15,"monthlyPrice":125.34},{"downpayment":211.4,"numberOfMonths":18,"monthlyPrice":105.7}]},{"planId":"0d36b969-be68-4415-9585-e637eda5a41d","cost":2280,"coverageMonths":36,"coverageMiles":100000,"financeOptions":[{"downpayment":2280,"numberOfMonths":0,"monthlyPrice":0},{"downpayment":239,"numberOfMonths":12,"monthlyPrice":179.25},{"downpayment":242.5,"numberOfMonths":15,"monthlyPrice":145.5},{"downpayment":245,"numberOfMonths":18,"monthlyPrice":122.5}]}],planRequestId:"f0e06ae2-3177-4ca4-879f-d9886cea2a98"};
	var plans = {};
	for(var i = 0; i<json.plans.length; i++){
		var year = Math.round(json.plans[i].coverageMonths/12);
		var mileage = json.plans[i].coverageMiles.toString();

		if(!plans[year]) plans[year] = {};
		if(!plans[year][mileage]) plans[year][mileage] = {};

		plans[year][mileage]['cost'] = json.plans[i].cost;
		plans[year][mileage]['financeOptions'] = json.plans[i].financeOptions;
	}
	console.log(plans);
	$( "#input-range1" ).slider({
		step:(100/(obj_length(plans)-1))
	});
});
/* 5FRYD4H43GB017942  1000 */
function get_json(mark,mil){
	$.ajax({
		url:'https://high-quality.tech/illdriveit/warranty/plans',
		type: "GET",
		crossDomain: true,
		data: 'vin='+mark+'&mileage='+mil,
		dataType : "jsonp",
		success:function(data){
			console.log(data);
		}
	});	
}
function obj_length(obj){
	var i = 0;
	for(var key in obj) i++;
	return i;
}