const express  = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
var mongoose = require('mongoose');


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
var db;


var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}


MongoClient.connect(url, function(err, c_db) {
     db = c_db;

    if(err){
        
        console.log(err);

        return;

    }

    const server = app.listen(8081,function(){
          var host = server.address().address;
          var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)
    }); 
    var dummyData = {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": "1"
   };

    db.collection('users').save(dummyData,(err,result) =>{
        console.log("saved to db")
    })

  console.log("Connected correctly to bro");

 
  //db.close();
});
app.use(bodyParser.urlencoded())
app.use(bodyParser.json({
  extended: true
}))

//api for getting user
app.get('/listusers',function(req,res){
    /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });*/
   /* var db_res =  db.collection('users').find();
    console.log(db_res);*/

    db.collection('users').find().toArray(function(err, results) {
        console.log(err);
        console.log(results)
  // send HTML file populated with quotes here
    })
});

//api for adding user
app.post('/addUser',function(req,res){
    console.log("post called");
   /* console.log(req);*/

    console.log(req.body);

    if(req.body){
        db.collection('users').save(req.body,(err,result)=>{
            console.log(result);
        })
        db.close();
    }

res.send('post message send');
    /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       
        data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));


       res.end( data );
    });*/

})

  