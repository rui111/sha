let express=require('express');
let app =express();
var db=[];
app.use(express.static('public'))
//set engine 
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
let bodypasrer=require('body-parser');
app.use (bodypasrer.urlencoded({extended:false}));
app.use(bodypasrer.json());
app.use(express.static('img'));
var filepath=__dirname+"/views/";
app.get("/",function(req,res){
    let fileName=filepath+"inde.html";
    res.sendFile(fileName);
});
app.get("/addTask",function(req,res){
    let fileName=filepath+"index.html";
    res.sendFile(fileName);
    

});
app.post("/regi",function(req,res){
    db.push(req.body);
    res.render("list",{mycustomers:db})

})
app.get("/listTask",function(req,res){
    res.render("list",{mycustomers:db})
   
})
;
app.listen(8080);

