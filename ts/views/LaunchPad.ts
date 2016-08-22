'use strict';


namespace illdriveit {
    export module Providers {
        export function Get (callback) {
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

                /*wingz: {
                    name: 'Wingz',
                    logo: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/42373/large_Picture1.png',
                    discount: 0,
                    
                    data: {
                        income_trip: 0,
                    }
                },

                getaround: {
                    name: 'Getaround',
                    logo: 'https://hustlecon.com/assets/getaround_logo.jpg',
                    discount: 0,
                    
                    data: {
                        income_trip: 0,
                    }
                },

                hopskipdrive: {
                    name: 'HopSkipDrive',
                    logo: 'https://static1.squarespace.com/static/54bc0cc4e4b071c8f286c9e2/t/54bc0ff6e4b0ff95699049e5/1471051922007/?format=1500w',
                    discount: 0,
                    
                    data: {
                        income_trip: 0,
                    }
                },*/
            });
        }
    }
    export module LaunchPad {
        export function initialize () {

            //Add buttons
            $('#services').html('');
            illdriveit.Providers.Get((err, providers) => {
                for (var key in providers) {
                    if (!providers.hasOwnProperty(key))
                        continue;

                    var service = providers[key];

                    $('#services').append(
                        '<a class="button image-only bunting-border" href="#ref-name" data-ref="' + key + '" title="' + service.name + '">' +
                        '<img src="' + service.logo + '" data-ref="' + key + '"/>' +
                        '</a>'
                    );
                }

                //Handle service click
                $('#services a').on('click', (e) => {
                    let ref = $(event.target).data('ref');
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
    }
}