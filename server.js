const express = require('express');
const app = express();
const fs = require("fs");

var newData  = {
      "key" : "lkjh"
     
   };

app.get('/getKeys',function (req,res) {
    fs.readFile(__dirname + "/" + "keys.json", 'utf8', function (err, data) {
       res.end( data );
   });

});


app.post('/addKeys',function(req,res){
    fs.readFile(__dirname + "/"  + "keys.json","utf8",function(err,data){
        console.log(data);
        data = JSON.parse(data);
        
       data["user4"] = newData;
       /* console.log( data );*/
        res.end( JSON.stringify(data));

    })
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
