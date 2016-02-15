var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + 'views'));

app.get('/', function (req, res) {
 res.sendFile(__dirname+'/views/index.html');
});

app.get('/*', function (req, res) {
 res.redirect('/');
});

app.listen(process.env.PORT || 5000);