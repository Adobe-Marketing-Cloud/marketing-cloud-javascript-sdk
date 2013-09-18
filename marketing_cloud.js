(function($) {
  window.MarketingCloud = {
    env:   {},
    wsse:  new OM_WSSE(),

    /** Generate the auth credentials */
    generateAuth: function (username, secret)
    {
        var nonce = MarketingCloud.wsse.generateNonce();
        var created = MarketingCloud.wsse.generateCreated();

        MarketingCloud.wsse.set(username, secret, nonce, created);

        var headers = MarketingCloud.wsse.generateRESTHeaders();
        return headers;
    },

    /** Make the api request */
    /* callback should follow standard jQuery request format:
     *    function callback(data)
     */
    makeRequest: function (username, secret, method, params, endpoint, callback)
    {
        var headers = MarketingCloud.generateAuth(username, secret);
        var url = 'https://'+endpoint+'/admin/1.3/rest/?method='+method;
        $.ajax(url, {
            type:'POST',
            data: params,
            complete: callback,
            dataType: "text",
            headers: {
                'X-WSSE': headers['X-WSSE']
            }
        });
    }
  };
})(jQuery);
