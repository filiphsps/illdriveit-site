//@file contracts.js
//Handles general contract getting
var ContractManager = {

    //ContractManager.RequestContract(string, string, object, function)
    //string uri: the path to the .html contract
    //string id: the selector for the element the contract should be loaded into
    //object data: 
    //function callback: The callback
    RequestContract: function (uri, id, data, callback) {
        try {
            //Request file from /contracts/{uri}
            return $.ajax({
                type: 'GET',
                url: '../contracts/' + uri + '.html',
                cache: false
            }).done(function (contract) {

                //Loop through data and replace the strings in contract
                for (var str in data) {
                    if (!data.hasOwnProperty(str)) continue;

                    //Replace template string with data
                    contract = contract.replace('{{' + str + '}}', data[str]);
                }

                //Insert contract into {id}
                return $(id).html(contract).promise().done(function(){
                    callback(null, true);
                });
            }).fail(function ( u1, u2, err) {
                callback(err);
            });
        } catch(ex) {
            callback(ex);
        }
    },

    //ContractManager.ExistsContract(string, function)
    //string uri: the path to the .html contract
    //function callback: The callback
    ExistsContract: function (uri, callback) {
        try {
            return $.ajax({
                type: 'GET',
                url: '../contracts/' + uri + '.html',
                cache: false
            }).done(function () {
                callback(true);
            }).fail(function () {
                callback(false);
            });
        } catch(ex) {
            callback(false);
        }
    }
}