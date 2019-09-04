const mongoose = require('mongoose')
const Ingredient = require('./ingredient')

const menuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	noodleType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient',
		required: true
	},
	protein: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient',
		required: true
	},
	sauce: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient',
		required: true
	},
	baseIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingredient',
	}],
	basePrice: {
		type: Number,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	}
})

module.exports = mongoose.model('MenuItem', menuItemSchema)