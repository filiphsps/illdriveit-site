'use stric';
var menuHeight = $('header nav').height();
var illdriveit;
(function (illdriveit) {
    var App;
    (function (App) {
        function initialize() {
            /*$('a[href*=#]').on('click', function (event) {
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
                } catch (ex) {
                    console.log(ex);
                }
            });*/
            $('.toggle-menu').click(function () {
                if (!$('header nav').hasClass('closed')) {
                    $('header nav').addClass('closed');
                    $('header nav').animate({
                        height: 0,
                        'padding-top': 0,
                        'padding-bottom': 0,
                    });
                }
                else {
                    $('header nav').removeClass('closed');
                    $('header nav').animate({
                        height: menuHeight,
                        'padding-top': 5,
                        'padding-bottom': 5,
                    });
                }
            });
            illdriveit.LaunchPad.initialize();
        }
        App.initialize = initialize;
    })(App = illdriveit.App || (illdriveit.App = {}));
})(illdriveit || (illdriveit = {}));
$(document).ready(function () {
    illdriveit.App.initialize();
    $('header nav').height(0);
    $('header nav').css('padding', 0);
});
'use strict';
var illdriveit;
(function (illdriveit) {
    var Providers;
    (function (Providers) {
        function Get(callback) {
            callback(null, {
                uber: {
                    name: 'UBER',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Uber_logo.svg/512px-Uber_logo.svg.png',
                    discount: 0,
                    data: {
                        income_trip: 13.57,
                    }
                },
                lyft: {
                    name: 'Lyft',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/199px-Lyft_logo.svg.png',
                    discount: 0,
                    data: {
                        income_trip: 12.92,
                    }
                },
                doordash: {
                    name: 'DOORDASH',
                    logo: 'https://support.doordash.com/images/doordash-logo-red@2x.png',
                    discount: 0,
                    data: {
                        income_trip: 13.57,
                    }
                },
            });
        }
        Providers.Get = Get;
    })(Providers = illdriveit.Providers || (illdriveit.Providers = {}));
    var LaunchPad;
    (function (LaunchPad) {
        function initialize() {
            //Add buttons
            $('#services').html('');
            illdriveit.Providers.Get(function (err, providers) {
                for (var key in providers) {
                    if (!providers.hasOwnProperty(key))
                        continue;
                    var service = providers[key];
                    $('#services').append('<a class="button image-only bunting-border" href="#ref-name" data-ref="' + key + '" title="' + service.name + '">' +
                        '<img src="' + service.logo + '" data-ref="' + key + '"/>' +
                        '</a>');
                }
                //Handle service click
                $('#services a').on('click', function (e) {
                    var ref = $(event.target).data('ref');
                    $('#start-driving').attr('href', '/forcefield?ref=' + ref);
                    $('#ref-name').text(providers[ref].name);
                    $('.income-trip').text(providers[ref].data.income_trip.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }));
                    $('.income-month').text((providers[ref].data.income_trip * 200).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).replace(',', '.').replace('.00', '').slice(0, -2) + 'k');
                    $('.income-annual').text(((providers[ref].data.income_trip * 200) * 12).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).slice(0, -7) + 'k');
                    $('#ref-data').show();
                });
            });
        }
        LaunchPad.initialize = initialize;
    })(LaunchPad = illdriveit.LaunchPad || (illdriveit.LaunchPad = {}));
})(illdriveit || (illdriveit = {}));

//# sourceMappingURL=app.js.map
