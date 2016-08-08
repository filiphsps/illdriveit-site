var receipt_id = window.location.hash.substring(1);

$.ajax({
    url:'https://illdrive.it/api/warranty/receipt/' + receipt_id,
    type: "GET",
    success: function(res) {
        console.log(res);

        if(res.error)
            return $('main').html('<h1 class="error">Error!<br/>Cannot find the receipt #' + receipt_id + '<h1>');

        $('.name').text(res.first_name + ' ' + res.last_name);
        $('.address').text(res.address1);
        $('.location').text(res.city + ', ' + res.state + ' ' + res.zip);
        $('.make').text(res.make);
        $('.model').text(res.model);
        $('.mileage').text(res.mileage.toLocaleString('en-US'));

        $('.years').text(res.coverage_years);
        $('.months').text(res.number_of_months);
        $('.miles').text(res.coverage_miles.toLocaleString('en-US'));

        $('.payment-down').text(res.downpayment.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }));
        $('.payment-month').text(res.monthly_payment.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }));
        $('.cc1').text(res.downpayment_card + ' ' + res.downpayment_card_type);
        $('.cc2').text(res.finance_payment_card + ' ' + res.finance_payment_card_type);

        $('.total-sum').text((res.downpayment + (res.monthly_payment * res.number_of_months)).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }));
    },
    error: function(err) {
        $('main').html('<h1 class="error">Error!<br/>Cannot find the receipt #' + receipt_id + '<h1>');
    }
});