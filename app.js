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



app.use(bodyParser.urlencoded())
app.use(bodyParser.json({
  extended: true
}))

const options = {
    server: {
        socketOptions: {
            keepalive: 1
        }
    }
};

MongoClient.connect(url,options, function(err, c_db) {
    console.log("mongo connection test");
     db = c_db;

    if(err){                                                                                                    
        
        console.log(err);

        return;

    }

    const server = app.listen(8081,function(){
          var host = server.address().address;
          var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)
        db.close();
    }); 
    var dummyData = {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": "1"
   };

   /* db.collection('users').save(dummyData,(err,result) =>{
        console.log("saved to db")
    })*/

  console.log("Connected correctly to bro");

 
 
});


//api for getting user
app.get('/listusers',function(req,res){

   db.open(function(err,res){

    db.collection('users').find().toArray(function(err,result){
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
        db.close();
        

    })

   }) 
    
    res.send('users displayed in terminla');
});



app.get('/dropCl',function(req,res){

    
    db.collection('users').drop(function(err,suc){
        if(err){
            console.log(err);
            return;
        }

        console.log("successfully droped collectoin");
        db.close();

    })

      res.send('users collectoin dropped');


})
//api for adding user
app.post('/addUser',function(req,res){
    console.log("post called");
   /* console.log(req);*/

    console.log(req.body);

    if(req.body){
     
     db.open(function(err,sucess){

        db.collection('users').insertOne(req.body,(err,result)=>{
            //console.log(result);
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })

     })
        
       
    }

res.send('post message send');
res.end();
    /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       
        data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));


       res.end( data );
    });*/

})

  