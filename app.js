const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
//Parsing config file for the mongo db instance
const config = require('config');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
var mongo = config.get('mongo');
mongoose.connect("mongodb://"+mongo.host+":"+mongo.port); // connect to MongoDB
// handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./api/models/subscribeUser");
require("./api/models/company");
let routes = require("./api/routes/companyRoutes","./api/routes/subscribeUserRoutes");
let routes1 = require("./api/routes/subscribeUserRoutes");
routes(app); // register our routes
routes1(app); // register our routes

app.listen(port); 
console.log('App running on ' + port);