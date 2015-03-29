var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var argv = require('optimist').argv;
var Item = require('./lib/item.js');
var itemRoutes = require('./routes/items.js')
var itemUsageRoutes = require('./routes/item-usage.js')
mongoose.connect('mongodb://localhost:8090/consumer-meter');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/partials', express.static(__dirname + '/partials'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

itemRoutes.decorate(app);
itemUsageRoutes.decorate(app);

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.listen(8080, '127.0.0.1');
console.log("App listening on port 8080");
