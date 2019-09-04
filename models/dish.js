const mongoose = require('mongoose');
const Ingredient = require('./ingredient')

const dishSchema = new mongoose.Schema({
	menuItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MenuItem'
	},
	extraIngredients: [Ingredient.schema],
	specialInstructions: String,
	createdDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Dish', dishSchema)