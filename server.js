let express=require('express');
let app =express();

app.use(express.static('css'))
//set engine 
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
let bodypasrer=require('body-parser');
let mongodb=require('mongodb');
let morgan =require('morgan');
let db;
let MongoClient=mongodb.MongoClient;

let url="mongodb://localhost:27017/"

MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology:true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("2095db");
        }
    });



app.use (bodypasrer.urlencoded({extended:false}));
app.use(bodypasrer.json());
app.use(express.static('img'));
var filepath=__dirname+"/views/";
app.get("/",function(req,res){
    let fileName=filepath+"inde.html";
    res.sendFile(fileName);
});
//nothing  to djdk
app.get("/addTask",function(req,res){
    let fileName=filepath+"index.html";
    res.sendFile(fileName);
    

});
app.post("/regi",function(req,res){
    let userDetails = req.body;
    db.collection('users').insertOne({ name: userDetails.name, due: userDetails.date, des: userDetails.Descrip,state:userDetails.s });
    res.redirect('/listTask'); 

})
app.get("/listTask",function(req,res){

    db.collection('users').find({}).toArray(function (err, data) {
        res.render('list', { mycustomers: data });
    });
});

app.get("/deletecomplte",function(req,res){

    db.collection("users").deleteMany({state:"completed"}, function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('/listTask'); 
});
app.get("/deleteoldcomplte",function(req,res){
    let curdate=new Date();

    db.collection("users").deleteMany({state:"completed"} ,{$lte:curdate}, function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('/listTask'); 
});

app.post("/deletebyid",function(req,res){
  
    let i = new mongodb.ObjectID(req.body.id)
    
    db.collection("users").deleteOne({ _id:i}, function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('/listTask'); 
    })

app.post("/upbyid",function(req,res){
    console.log(req.body.id)
    let i = new mongodb.ObjectID(req.body.id)
    
    db.collection("users").deleteOne({ _id:i}, function (err, obj) {
        console.log(obj.result);
      });
      db.collection("users").updateOne({ _id:req.body.id}, { $set: {name:req.body.name ,due:req.body.date, des:req.body.due,state:req.body.s,} }, { upsert: true }, function (err, result) {
    });
    res.redirect('/listTask');

});



app.listen(8080);

