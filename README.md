marketing-cloud-javascript-sdk
==============================

Frontend Library for calling the Marketing Cloud APIs

Examples
--------

    function makeRequest(username, secret, method, params, endpoint, callback) {

        var wsse = new OM_WSSE();
        var nonce = wsse.generateNonce();
        var created = wsse.generateCreated();

        wsse.set(username, secret, nonce, created);

        var headers = wsse.generateRESTHeaders();
        var url = 'https://'+endpoint+'/admin/1.3/rest/?method='+method;

        $.ajax(url, {
            type:'POST',
            data: {},
            complete: function(data) { alert(data); }
            dataType: "text",
            headers: headers
        });
    }