require('dotenv').config()
const express 			= require('express');
const bodyParser 		= require('body-parser');
const session      	= require('express-session');
const app         	= express();
const PORT 				= process.env.PORT || 3000;

require('./db/db');

// CONTROLLERS GO HERE
const ingredientsController = require('./controllers/ingredientsController')
const usersController = require('./controllers/usersController')
const menuItemsController = require('./controllers/menuItemsController')
const dishController = require('./controllers/dishController')

app.use(session({
	secret: process.env.SECRET_STRING,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/ingredients', ingredientsController)
app.use('/users', usersController)
app.use('/menuItems', menuItemsController)
app.use('/dish', dishController)


// extra middleware goes here


app.listen(PORT, () => {
	console.log('listening for port: ' + PORT);
})