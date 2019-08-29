const mongoose = require('mongoose');
const Dish		= require('./dish')

const orderSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		requires: true
	},
	dishes: [Dish.schema],
	status: {
		type: String,
		enum: ['received', 'prepping', 'complete', 'archived'],
		requires: true
	},
	deliveryInstructions: String,
	address: {
		addr1: String, 
		addr2: String, 
		city: String, 
		state: String, 
		zip: String
	}
})

module.exports = mongoose.model('Order', orderSchema)



