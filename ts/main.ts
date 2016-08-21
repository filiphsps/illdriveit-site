'use stric';
declare var pagex: any;
declare var $: any;
 var menuHeight = $('header nav').height();

namespace illdriveit {
    export module App {
        export function initialize () {
            
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
                //LaunchPad.initialize();
            });

            pagex('/launch-pad', () => {
                illdriveit.LaunchPad.initialize();
            });
        }
    }
}

$(document).ready(() => {
    illdriveit.App.initialize();

    $('header nav').height(0);
    $('header nav').css('padding', 0);
});