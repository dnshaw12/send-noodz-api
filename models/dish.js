const mongoose = require('mongoose');
const Ingreditent = require('./ingreditent')

const dishSchema = new mongoose.Schema({
	menuItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MenuItem'
	},
	extraIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingreditent',
		required: true
	}],
	specialInstructions: String,
	createdDate: {
		type: Date,
		default: Date.now
	}
	total: function(){
		let extraIngredientsTotal = 0

		extraIngredients.forEach((ingreditent) => {
			extraIngredientsTotal =+ ingreditent.price
		})

		return menuItemId.basePrice + extraIngredientsTotal

	}
})

module.exports = mongoose.model('Dish', dishSchema)