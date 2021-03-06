var express = require("express")
var app = express();
var bodyParser = require('body-parser');



var sql = require('mssql');
  //api

  





app.use(express.static(__dirname + '/public/css'));//looking for the public folder
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir))

//database
const config = {
  user: 'detectives',
  password: 'neit2020',
  server: 'Sql.neit.edu',
  database: 'se425_food_detectives' ,
  port: 4500
};

  app.get('/',(req, res)=>{
    res.render('index.html');// this is the page
});//all can create pages
//render creates the page




//login-------------------------------------------------------------------------
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
// register -----------------------------------------------------------

app.post('/register', function(req, res) {
  var results;
  var username2 = req.body.username2;
  var firstName = req.body.firstName;
  var lastName= req.body.lastName;
  var emailAddress = req.body.emailAddress;
  var password = req.body.password;
  sql.connect(config).then(pool => {
    return pool.request()
      .input('username', sql.VarChar(30), username2)
      .input('password', sql.VarChar(30), password)
      .input('firstName', sql.VarChar(30), firstName)
      .input('lastName', sql.VarChar(30), lastName)
    .input('emailAddress', sql.VarChar(30), emailAddress)
    .output('returnValue', sql.VarChar(50))
    .execute('usp_Users_CreateNewUser')
  }).then(result => {
    console.log(result)
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
    res.render('logmain.html');
    //all lets use port or get
    });


 app.all('/Preferences', (req, res)=>{
    res.render('Preferences.html');
    //all lets use port or get
      });
  
      app.all('/product', (req, res)=>{
        res.render('product.html');
        //all lets use port or get
          });



 


app.listen(4000, ()=>{
    console.log('server is up at localhost:4000');
    
    })