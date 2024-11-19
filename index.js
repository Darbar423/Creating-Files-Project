const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join( __dirname,'public')));
app.set('view engine','ejs');

app.get('/', (req,res)=> {
    fs.readdir('./files',function (err,files){
        res.render('index', {files : files});
    });
});

app.get("/edit/:filename", (req,res) => {
    res.render('edit',{filename:req.params.filename});
});

app.post("/edit",(req,res) => {
    fs.rename(`./files/${req.body.title}` , `./files/${req.body.new}` , function(err,){
        res.redirect('/');
    });
});

app.get('/file/:filename',(req,res) =>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,filedata) {
        res.render("show", { filename : req.params.filename , filedata : filedata });
    });
});

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect('/');
    });
});

app.listen(port,()=>{
    console.log(`Server Started at the ${port}`);
});
