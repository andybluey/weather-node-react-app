var express = require('express');
var bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var port = 4000;
var secrets = require('./secrets.json');

var SECRET_KEY = secrets.key;

var app = express();
var server = require('http').createServer(app);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/', function(req, res) {
  res.json({ message: 'Testing the server' });
});

var requestedUrl = 'https://api.darksky.net/forecast/'+SECRET_KEY+'/';

app.get('/api/darksky', function(req, res) {
  try {

// Todo - set up query to get location options
    var location = '-33.8700308,151.2116687';
    var url = requestedUrl + location;
    console.log('Fetching '+ url);

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Incorrect Response'});
        }
        return response.json();
      })
      .then(function(payload) {
        res.status(200).json(payload);
      });
  } catch(err) {
    console.log("Error in server.js", err);
  }
});

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
