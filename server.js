require('dotenv').config()
const bodyParser 		= require('body-parser');
const session      	= require('express-session');
const cors 				= require('cors')
const http 				= require("http")
const PORT 				= process.env.PORT || 8000;
const socketIo 		= require('socket.io');

const express 			= require('express');
const app         	= express();
const server 			= http.createServer(app)
const io 				= socketIo(server)

require('./db/db');

app.use(cors({
	origin: [process.env.USER_URL, process.env.PREP_URL],
	credentials: true,
	optionsSuccessStatus: 200
}));

app.use(session({
	secret: process.env.SECRET_STRING,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.json());

// 
app.use((req, res, next) => {
	req.io = io
	req.socket = socketIo

	if (req.get('origin') === process.env.USER_URL) {

		req.user = 'user'

	} else if (req.get('origin') === process.env.PREP_URL) {

		req.user = 'prep'

	}

	next()
})


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

io.on('connection', socket => {
	console.log('user conneted io') 
})

server.listen(PORT, () => {
	console.log('listening for port: ' + PORT);
})