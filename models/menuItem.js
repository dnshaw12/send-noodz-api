const mongoose = require('mongoose')
const Ingreditent = require('./ingreditent')

const menuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	noodleType: {
		type: String,
		required: true
	},
	protein: {
		type: String,
		required: true
	},
	baseIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ingreditent',
		required: true
	}],
	basePrice: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('MenuItem', menuItemSchema)