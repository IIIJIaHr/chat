var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require('path');

var app = express();
var server = require('http').createServer(app);

mongoose.connect('mongodb://localhost/carshop_database');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db is open');
});
// users
var User = new mongoose.Schema({
  socketId: String,
  name: String
});

var UserModel = mongoose.model('User', User);
UserModel.remove({}, (err) => console.log('remove', err) );
// cars
var Car = new mongoose.Schema({
    model: String,
    mark: String
});

var CarModel = mongoose.model('Car', Car);

// messages
var Message = new mongoose.Schema({
    author: String,
    text: String
});

var MessageModel = mongoose.model('Message', Message);

// configurations server
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.use(express.static(__dirname));

require('./source/api/cars')(app, CarModel);
require('./source/api/messages')(app, MessageModel);
require('./source/api/users')(app, UserModel);

server.listen(8000, function() {

});
require('./source/chatSocket')(server, UserModel);
