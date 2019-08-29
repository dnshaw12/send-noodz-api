const mongoose = require('mongoose');
const ingreditent = require('./ingreditent')

const dishSchema = new mongoose.Schema({
	menuItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MenuItem'
	},
	extraIngredients: [Ingreditent.schema],
	specialInstructions: String,
	createdDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Dish', dishSchema)