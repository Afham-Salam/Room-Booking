require('dotenv').config();  // Load environment variables

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');  // Import CORS

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { auth } = require('./middleware/authMiddleware');
const cronjob = require('./cron');

var app = express();

// Middleware to enable CORS
app.use(cors());

// View engine setup (Optional if you're not using Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up logging, body parsing, and cookie parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes

app.use('/api/auth', require('./routes/auth'));
app.use(auth);
app.use('/api/users', require('./routes/users'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

 cronjob.start()


module.exports = app;
