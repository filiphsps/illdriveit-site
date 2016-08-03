var receipt_id = window.location.hash.substring(1);

$.ajax({
    url:'https://high-quality.tech/illdriveit/warranty/receipt/' + receipt_id,
    type: "GET",
    success: function(res) {
        console.log(res);

        $('.name').text(res.first_name + ' ' + res.last_name);
        $('.address').text(res.address);
        $('.location').text(res.city + ', ' + res.state + ' ' + res.zip);
        $('.vin').text(res.vin);

        $('.years').text(res.years);
        $('.miles').text(res.miles);

        $('.payment-down').text('$' + res.down);
        $('.payment-month').text('$' + res.month);
        $('.total-sum').text('$' + res.total);
    },
    error: function(err) {
        //$('main').html('<h1 class="error">Error!<br/>Cannot find the receipt #' + receipt_id + '<h1>');
    }
});