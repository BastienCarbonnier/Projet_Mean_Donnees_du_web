/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

process.env.NODE_ENV = "test";

var express =require("express");

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var biensRouter = require('./routes/biens');
var servicesRouter = require('./routes/services');
var membresRouter = require('./routes/membres');
var dispoRouter = require('./routes/disponibilites');
var utilRouter = require('./routes/utilisations');

var config = require('./ressource/config/config');

var app = express();
var port = 8888;

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/Biens/', biensRouter);
app.use('/Services/', servicesRouter);
app.use('/Membres/', membresRouter);
app.use('/Disponibilites/', dispoRouter);
app.use('/Utilisations/', utilRouter);




MongoClient.connect(config.mongodb.url,config.mongodb.useNewUrlParser, (err, client) => {
    db = client.db("base_troc");
    assert.equal(null, err);
    app.locals.db = db;
    app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port " + port);
    });
});
