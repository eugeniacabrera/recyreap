const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const routes = require('./routes/index');
require('./passport/passport')(passport);
const nodemailer = require('nodemailer');


//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', routes);


// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('servidor funcionando!')
});