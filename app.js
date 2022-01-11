var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//reading an environment variable to get the correct .env file.
//I have prepared to .env files: development.env and production.env
//when running npm start, it will set the NODE_ENV environment variable to development, it is written in the package.json file
//for example when running from Docker it will work with the production.env file
require('dotenv').config({ path: `${process.env.NODE_ENV}.env` })

var todoRouter = require('./routes/todo');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var cors = require('cors');

app.use(cors());

app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
