var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var csvModel = require('./models/csv');
var csv = require('csvtojson');
var bodyParser = require('body-parser');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

var uploads = multer({storage:storage});

mongoose.connect('mongodb+srv://uploaddata:nexuses@cluster0.bi9kqzp.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true})  
.then(()=> console.log('connected to db'))
.catch((err)=>console.log(err))

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/',(req, res) => {
    csvModel.find((err,data)=>{
        if(err) {
            console.log(err);
        }
        else {
            if(data!=''){
                res.render('demo',{data:data});
            }
            else{
                res.render('demo',{data:''});
            }
        }
    })
})

app.post('/',uploads.single('csv'),(req,res)=>{
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        console.log(jsonObj)

        csvModel.insertMany(jsonObj,(err,data)=>{
            if(err){
                console.log(err)
            }
            else {
                res.redirect('/');
            }
        })
    })
})

var port = process.env.POST || 3080;
app.listen(port,()=>console.log('Server run at port' + port))
