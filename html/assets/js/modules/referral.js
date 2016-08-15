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
        };

        return callback(null, referrers[ref.toLowerCase()]);
    }
}