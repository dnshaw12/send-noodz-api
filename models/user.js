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
	password: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String
	},
	address: {
		addr1: {
			type: String,
			required: true
		},
		addr2: String, 
		city: {
			type: String,
			required: true
		}, 
		state: {
			type: String,
			required: true
		}, 
		zip: {
			type: String,
			required: true
		}
	},
	profilePic: {
		data: Buffer,
		contentType: String
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('User', userSchema)



