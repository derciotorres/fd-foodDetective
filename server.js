var express = require("express")
var app = express();
var hbs = require ('hbs');
hbs.registerPartials(__dirname + '/views/partials');
var bodyParser = require('body-parser');
var sql = require('mssql');

const config = {
  user: 'detectives',
  password: 'neit2020',
  server: 'Sql.neit.edu',
  database: 'se425_food_detectives' ,
  port: 4500
};

app.set('view engine', 'hbs');// sets up the view
app.use(express.static(__dirname + '/public/css'));//looking for the public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir))



  app.get('/',(req, res)=>{
    res.render('index.hbs');// this is the page
});//all can create pages
//render creates the page

app.post('/signup', function(req, res) {
  var results;
  var username = req.body.username;
  var password = req.body.password;
  sql.connect(config).then(pool => {
    return pool.request()
    .input('username', sql.VarChar(30), username)
    .input('password', sql.VarChar(30), password)
    .output('returnValue', sql.VarChar(50))
    .execute('usp_Users_UserLogin')
  }).then(result => {
    //console.log(result)
    results = result;
    console.log(results)
    if (result.output.returnValue == 1){
      res.redirect('/product');
    } else {
      console.log('error')
    }
  }).catch(err => {
    console.log(err)
  })

});


app.all('/logmain', (req, res)=>{
    res.render('logmain.hbs');
    //all lets use port or get
    });


 app.all('/Preferences', (req, res)=>{
    res.render('Preferences.hbs');
    //all lets use port or get
      });
  
      app.all('/product', (req, res)=>{
        res.render('product.hbs');
        //all lets use port or get
          });



 


app.listen(4000, ()=>{
    console.log('server is up at localhost:4000');
    
    })