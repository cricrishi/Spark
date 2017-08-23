const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/spark"); // connect to MongoDB
// handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./api/models/subscribeUser");
let routes = require("./api/routes/subscribeUserRoutes");
routes(app); // register our routes
app.listen(port); 
console.log('App running on ' + port);