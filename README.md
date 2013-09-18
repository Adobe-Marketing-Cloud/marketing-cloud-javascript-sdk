# Marketing Cloud Javascript SDK

A frontend library for calling the Marketing Cloud APIs

See `index.html` for an example of calling the marketing cloud APIs using javascript.

```bash
$ git clone git@github.com:Adobe-Marketing-Cloud/marketing-cloud-javascript-sdk.git
$ cd marketing-cloud-javascript-sdk/
$ open index.html
```

This provides you with a tiny form to call the Marketing Cloud APIs.

Examples
--------

```javascript

var username = 'YOUR_USERNAME';
var secret   = 'YOUR_SECRET';
var method   = 'Company.GetReportSuites'
var params   = {};
var endpoint = 'api.omniture.com';

MarketingCloud.makeRequest(username, secret, method, params, endpoint, function(response) {
    alert('API Response: ' + response.responseText);
});
```
