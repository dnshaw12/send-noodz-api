const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ['noodle','protein','normal'],
		required: true
	},
	vegitarian: {
		type: Boolean,
		required: true
	},
	vegan: {
		type: Boolean,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	},
	inStock: {
		type: Boolean,
		required: true,
		default: true
	},
	archived: {
		type: Boolean,
		required: true,
		default: false
	}
})


module.exports = mongoose.model('Ingredient', ingredientSchema)





