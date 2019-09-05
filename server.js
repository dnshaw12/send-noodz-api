require('dotenv').config()
const express 			= require('express');
const bodyParser 		= require('body-parser');
const session      	= require('express-session');
const app         	= express();
const cors 				= require('cors')
const PORT 				= process.env.PORT || 3000;

require('./db/db');

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}));

app.use(session({
	secret: process.env.SECRET_STRING,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.json());


// CONTROLLERS GO HERE
const ingredientsController = require('./controllers/ingredientsController')
const usersController = require('./controllers/usersController')
const menuItemsController = require('./controllers/menuItemsController')
const dishController = require('./controllers/dishController')
const orderController = require('./controllers/orderController')

app.use('/ingredients', ingredientsController)
app.use('/users', usersController)
app.use('/menuItems', menuItemsController)
app.use('/dishes', dishController)
app.use('/orders', orderController)


// extra middleware goes here


app.listen(PORT, () => {
	console.log('listening for port: ' + PORT);
})