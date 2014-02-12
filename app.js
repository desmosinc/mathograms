// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

//thin wrapper around the mandrill client that just
//makes "send" a no-op if a mandrill key isn't provided
var email_helper = require('./email_helper');
var quotes = require('./math_quotes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.render('compose', {host: req.get('host')});
});

app.get('/view', function(req, res) {
  res.render('view', {host: req.get('host')});
});

app.get('/about', function(req, res) {
  res.render('about', {host: req.get('host')});
});

app.post('/send', function (req, res) {

  var name = req.body.name;
  var subject = (name ? name + ' sent you a math-o-gram!' : 'You have a math-o-gram!');

  res.render('email',
    {
      url: req.body.link,
      host: req.get('host'),
      quote: quotes.sample(),
      subject: subject
    }, function(err, body) {

      var recipients = req.body.recipients.split(',');
      var to = [];
      for (var i = 0 ; i < recipients.length ; i++) {
        to.push({
          'email': recipients[i],
          'type': 'to'
        });
      }

      var message = {
        "html": body,
        "subject": subject,
        "from_email": 'cupid@desmos.com',
        "from_name": 'Desmos Cupid',
        "track_opens": false,
        "track_clicks": false,
        "to": to,
        "preserve_recipients": false,
        "important": false
      };

      email_helper.send({
        "message": message,
        "async": false,
      }, function(result) {
        res.send(result[0] && result[0].status === 'sent' ? 200 : 403);
      });
    }
  );
});

// Set server port
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('server is listening on ' + port);
});
