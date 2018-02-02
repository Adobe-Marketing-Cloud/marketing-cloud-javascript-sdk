var isNode = typeof module !== 'undefined';
if (isNode) {
  // Load up a virtual dom to make the Ajax calls possible.
  // In a node environment and while using a library that uses jQ's ajax require some extra things.
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;
  // In node, lets require jQuery; in the browser lets hope jQuery is already there as it often is (circa 2018)
  var $ = jQuery = require('jquery')(window);

}

(function($) {
  var Wsse = require('./wsse.js')
  MarketingCloud = {
    env:   {},
    wsse:  new Wsse(),

    /** Make the api request */
    /* callback should follow standard jQuery request format:
     *    function callback(data)
     */
    makeRequest: function (username, secret, method, params, endpoint, callback)
    {
        var headers = MarketingCloud.wsse.generateAuth(username, secret);
        var url = 'https://'+endpoint+'/admin/1.4/rest/?method='+method;
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

module.exports = MarketingCloud;
