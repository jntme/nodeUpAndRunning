var http = require('http');
var assert = require('assert');

var opts = {
    host: 'localhost',
    port: 3000,
    method:'POST',
    path: '/send',
    headers: {'content-type':'application/x-www-form-urlencoded'}
};

var req = http.request(opts, function(res) {
    res.setEncoding('utf8');

    var data = "";

    res.on('data', function(c) {
        data += c;
    });

    res.on('end', function() {
        assert.strictEqual(data, '{"status":"ok","message":"Tweet received."}');
    });

});

req.write('tweet=test');
req.end();
