var express = require('express')
  , mongoskin = require('mongoskin')
  , bodyParser = require('body-parser')
var restservice = require('/routes/restservice');
var app = express()
app.use(bodyParser())
var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/partials", express.static(__dirname + '/partials'));
var db = mongoskin.db('mongodb://dbadmin:dbpassword@ds049744.mongolab.com:49744/heroku_5q9qxh3r', {safe:true})
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/service', restservice);


app.get('/', function(req, res, next) {
  res.render('./index')
})


app.listen(process.env.PORT || 3000)
