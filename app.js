const express  = require('express');
const app = express();
const fs = require("fs");
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';


var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}


MongoClient.connect(url, function(err, db) {
    if(err){
        
        console.log(err);

        return;

    }

    const server = app.listen(8081,function(){
          var host = server.address().address;
          var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)
    }); 

  console.log("Connected correctly to bro");

 
  db.close();
});

//api for getting user
app.get('/listusers',function(req,res){
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
});

//api for adding user
app.post('/addUser',function(req,res){

    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       
        data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));


       res.end( data );
    });

})

  