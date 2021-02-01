var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');




const app = express();
const port = 8000;
var cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));



app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter);


// catch 404 and forward to error handle

app.listen(port, console.log(`Serwer urochomiony na porcie 8000`));


module.exports = app;
