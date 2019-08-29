require('dotenv').config()
const express 			= require('express');
const bodyParser 		= require('body-parser');
const session      	= require('express-session');
const app         	= express();
const PORT 				= process.env.PORT || 3000;

require('./db/db');

// CONTROLLERS GO HERE

app.use(session({
	secret: process.env.SECRET_STRING,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));


// extra middleware goes here


app.listen(PORT, () => {
	console.log('listening for port: ' + PORT);
})