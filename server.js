// Assign the required packages and dependencies to variables
var express = require('express');
var ODataServer = require("simple-odata-server");
var Adapter = require('simple-odata-server-mongodb');
var MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var path = require("path");

// Create app variable to initialize Express 
var app = express();
const PORT = process.env.PORT || 4001;

// Use static server to serve the Express Yourself Website
app.use(express.static('webapp'));

// Enable Cross-origin resource sharing (CORS)  for app.
app.use(cors("*"));

// Instantiates ODataServer and assigns to odataserver variable.
const EntityModel = require('./data/EntityModel.js');
var odataServer = ODataServer().model(EntityModel);

// Connection to demo database in MongoDB
MongoClient.connect("mongodb://localhost/SensorCockpit" , { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.error('mongo connection error: ', err.message);
        reject(err);
      } else {
        console.info("connected to mongodb");
        odataServer.adapter(Adapter(function (cb) {
            cb(err, db.db('myodatadb'));
        }));
      }
    
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/webapp/index.html'));
    //__dirname : It will resolve to your project folder.
});

// The directive to set app route path.
app.use("/odata", function (req, res) {
    odataServer.handle(req, res);
});

// The app listens on port 3010 and prints the endpoint URI in console window.
var server = app.listen(PORT, function () {
    console.log('Server running at: ');
    console.log('Webapp        http://localhost:'+PORT);
    console.log('oData-Service http://localhost:'+PORT+'/odata/ ');
});