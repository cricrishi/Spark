const express  = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
//const webpush = require('web-push');
var mongoose = require('mongoose');
var serviceAccount = require("./serviceAccountKesy.json");


//const vapidKeys = webpush.generateVAPIDKeys();


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
var db;
var registrationTokenList = [];



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
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://keeper-d3110.firebaseio.com"
        });
        db.close();
    }); 

 
 
});

function formateResult(result){
    registrationTokenList = result.map(function(item){
        return item.id;
    })

    console.log(registrationTokenList);

}


function retrieveUser(compId){
    var query = {compId:compId};
    var projection = {_id:0,id:1};

    db.open(function(err,res){
        if(err){
            console.log("error in db handling" + err);
        }
        db.collection('users').find(query,projection).toArray(function(err,result){
            if(err){
                console.log(err);
                return;
            }
            formateResult(result);
             sendMessage();
            db.close();
        })
    })
    
};



function sendMessage(){
    var payload = {
              data: {
                message: "Push Message",
                title: "Push Title"
              }
        }; 

        //console.log(registrationTokenList);

    admin.messaging().sendToDevice(registrationTokenList, payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
    res.end();
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
    res.end();
  });
}


//api for getting user
app.get('/listusers',function(req,res){

   db.open(function(err,res){

    db.collection('users').find({},{_id:0,id:1,compId:1}).toArray(function(err,result){
        if(err){
            console.log(err);
            return;
        }
        formateResult(result);
        console.log(result);
        db.close();
        

    })

   }) 
    
    res.send('users displayed in terminla');
});



app.get('/dropCl',function(req,res){


    db.open(function(err,sucess){
        db.collection('users').drop(function(err,suc){
            if(err){
                console.log(err);
                return;
            }

            console.log("successfully droped collectoin");
            db.close();

        })

      res.end();



    })
    
   


});
//api for adding user
app.post('/addUser',function(req,res){
  
  if(req.body){
     
     db.open(function(err,sucess){

        db.collection('users').insertOne(req.body,(err,result)=>{
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })

     })
        
       
    }

    res.send('post message send');
    res.end();
    

})


app.post('/sendMsg',function(req,res){

    var compId = req.body.compId;
    

    retrieveUser(compId);
   


    res.send('Given compId-' + req.body.compId);
    res.end();

   
        
/*
        var payload = {
              data: {
                message: "Push Message",
                title: "Push Title"
              }
        }; 

    admin.messaging().sendToDevice(registrationTokenList, payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
    res.end();
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
    res.end();
  });*/
    


})

  