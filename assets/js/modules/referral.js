//@file referral.js
//Handles referrals
var ReferralManager = {

    //ReferralManager.GetValues(strin, string, object, function)
    //string ref: the referrer as string
    //function callback: The callback
    GetValues: function (ref, callback) {
        var referrers = {
            uber: {
                name: 'UBER',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Uber_logo.svg/512px-Uber_logo.svg.png',
                discount: 0
            },
            lyft: {
                name: 'Lyft',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/199px-Lyft_logo.svg.png',
                discount: 0
            },
            doordash: {
                name: 'DOORDASH',
                logo: 'https://support.doordash.com/images/doordash-logo-red@2x.png',
                discount: 0
            },
            wingz: {
                name: 'Wingz',
                logo: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/42373/large_Picture1.png',
                discount: 0
            },
            getaround: {
                name: 'Getaround',
                logo: 'https://hustlecon.com/assets/getaround_logo.jpg',
                discount: 0
            },
            hopskipdrive: {
                name: 'HopSkipDrive',
                logo: 'https://static1.squarespace.com/static/54bc0cc4e4b071c8f286c9e2/t/54bc0ff6e4b0ff95699049e5/1471051922007/?format=1500w',
                discount: 0
            },
        };

        return callback(null, referrers[ref.toLowerCase()]);
    }
}