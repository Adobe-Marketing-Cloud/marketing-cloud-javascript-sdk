var isNode = typeof window === "undefined";
if (isNode) {
  // Load up a virtual dom to make the Ajax calls possible.
  // In a node environment and while using a library that uses jQ's ajax require some extra things.
  var jsdom = require('jsdom');
  // // In node, lets require jQuery; in the browser lets hope jQuery is already there as it often is (circa 2018)
  var $ = jQuery = require('jquery')(new jsdom.JSDOM().window);

}
else {
  var $ = jQuery = require('jquery')
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
// In node or browserify
if (typeof module !== "undefined") {
  module.exports = MarketingCloud;
}
else {
  // In browser
  window.MarketingCloud = MarketingCloud;
}
