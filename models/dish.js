const mongoose = require('mongoose');
const Ingredient = require('./ingredient')

const dishSchema = new mongoose.Schema({
	menuItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MenuItem'
	},
	extraIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient',
		required: true
	}],
	specialInstructions: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	// total: function(){
	// 	let extraIngredientsTotal = 0

	// 	extraIngredients.forEach((ingredient) => {
	// 		extraIngredientsTotal =+ ingredient.price
	// 	})

	// 	return menuItemId.basePrice + extraIngredientsTotal

	// }
})

module.exports = mongoose.model('Dish', dishSchema)