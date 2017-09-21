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

}


//api for getting user
app.get('/listusers',function(req,res){

   db.open(function(err,res){

    db.collection('users').find({},{_id:0,id:1}).toArray(function(err,result){
        if(err){
            console.log(err);
            return;
        }
        formateResult(result);
        console.log(registrationTokenList);
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


app.get('/sendMsg',function(req,res){

    /*db.open(function(err,res){

        db.collection('users').find().toArray(function(err,result){
            if(err){
                console.log(err);
                return;
            }
            console.log(result);
            db.close();
            

        })

       }) */
        
       //var registrationToken = "frcSHs5RCKw:APA91bH476UD0M8RdrUWaQmVy7cWoMIR1v8ojtQCrp6Cn5aqQ1O4bUTfimAkqu5uTGOkhvI6p06Ksai1n3roHrfdFUhdNdhDf-YUqvO4yOEwjdqqTx8NZzK4YZNzR7yX8DUITnhsCOCd";
        var payload = {
              data: {
                message: "Push Message",
                title: "Push Title"
              }
        }; 

    admin.messaging().sendToDevice(registrationTokenList, payload)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
    res.end();
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
    res.end();
  });
    


})

  