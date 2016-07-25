//@file contract-manager.js
//Handles general contract getting
var ContractManager = {

    //ContractManager.RequestContract(strin, string, object, function)
    //string uri: the path to the .html contract
    //string id: the selector for the element the contract should be loaded into
    //object data: 
    //function callback: The callback
    RequestContract: function (uri, id, data, callback) {

        //Request file from /contracts/{uri}
        $.ajax({
            type: 'GET',
            url: '/contracts/' + uri + '.html',
        }).done(function (contract) {

            //Loop through data and replace the strings in contract
            for (var str in data) {
                if (!data.hasOwnProperty(str)) continue;

                //Replace template string with data
                contract = contract.replace('{{' + str + '}}', data[str]);
            }

            //Insert contract into {id}
            $(id).html(contract).promise().done(function(){
                callback();
            });
        });
    }
}