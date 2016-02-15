var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
  }
});

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
  {
    res.status(400);
    return res.send('Your message couldnt be sent. Please try again later');
  }
 
  if(req.body.antispam !== '2')
  {
    res.status(400);
    return res.send('Please, answer correctly the antispam question.');
  }

  var mailOptions = {
    to : process.env.MAIL_TO,
    subject : "[Contact - Web]",
    text : "From: "+req.body.email+"\nMessage: "+req.body.message
  } 

  transporter.sendMail(mailOptions, function(error, info){
    if(error)
    {
      console.error(error);
      res.end("error");
    }
    else
    {
      console.log('Message sent: ' + info.response);
      return res.send("Success");
    }
  });
});

app.listen(process.env.PORT || 5000);