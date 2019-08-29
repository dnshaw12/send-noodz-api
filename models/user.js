const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String
	},
	address: {
		addr1: String, 
		addr2: String, 
		city: String, 
		state: String, 
		zip: String
	},
	profilePic: {
		data: Buffer,
		contentType: String
	}
})

module.exports = mongoose.model('User', userSchema)



