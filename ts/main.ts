'use stric';
declare var pagex: any;
declare var $: any;
var menuHeight = $('header nav').height();

namespace illdriveit {
    export module App {
        export function initialize () {

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

            $('.toggle-menu').click(function() {
                if (!$('header nav').hasClass('closed')) {
                    $('header nav').addClass('closed');
                    $('header nav').animate({
                        height: 0,
                        'padding-top': 0,
                        'padding-bottom': 0,
                    });
                } else {
                    $('header nav').removeClass('closed');
                    $('header nav').animate({
                        height: menuHeight,
                        'padding-top': 5,
                        'padding-bottom': 5,
                    });
                }
            });

            pagex('/income-calculator', () => {
                //IncomeCalculator.initialize();
            });

            pagex('/launch-pad', () => {
                illdriveit.LaunchPad.initialize();
            });

            pagex('/forcefield', () => {
                //Forcefield.initialize();
            });
        }
    }
}

$(document).ready(() => {
    illdriveit.App.initialize();

    $('header nav').height(0);
    $('header nav').css('padding', 0);
});