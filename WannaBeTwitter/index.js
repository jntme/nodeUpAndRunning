

var express = require('express');
var bodyParser= require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen(3000);

var tweets = [];

app.get('/', function(req, res){
  res.send('Say hello to my twitter app! :)');
});

app.post('/send', urlencodedParser, function(req, res) {
    if(req.body && req.body.tweet) {
        tweets.push(req.body.tweet);
        res.send({status: 'ok', message: 'Tweet received.'});
        console.log('Saved tweet: ' + req.body.tweet);
    }
    else {
        res.send({status: 'nok', message: 'No tweet recieved.'});
    }
});

app.get('/tweets', function(req, res) {
    res.send(tweets);
});

