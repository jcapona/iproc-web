var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();


var transporter = nodemailer.createTransport('smtps://'+MAIL_ID+'%40gmail.com:'+MAIL_PASS+'@smtp.gmail.com');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + 'views'));

// create application/json parser 
var jsonParser = bodyParser.json()
 // create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Routes 
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.post('/contact', urlencodedParser, function(req, res) {
 
  if(!req.body) 
    return res.sendStatus(400);
 
  if(req.body.antispam !== '2')
    return res.send("");

  var mailOptions = {
    to : MAIL_TO,
    subject : "[Contact - Web]",
    text : "From: "+req.body.email+"\nMessage: "+req.body.message
  } 

  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error)
    {
      console.error(error);
      res.end("error");
    }
    else
    {
      console.log('Message sent: ' + info.response);
      res.end("sent");
    }
  });
});

app.listen(process.env.PORT || 5000);