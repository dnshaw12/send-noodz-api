const express = require('express');
const router  = express.Router();
const multer = require('multer')
const Order = require('../models/order')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('image'), async (req, res, next) => {
	console.log(req.body, 'body in order creation');

	// dish for testing : 5d6c09316ee56208e6967623
	// user for testing : 5d694d0fe12a27064632f82f

	try {

		req.body.address = {}

		req.body.address.addr1 = req.body.addr1
		req.body.addr2 ? req.body.address.addr2 = req.body.addr2 : req.body.address.addr2 = null
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip

		const newOrder = await Order.create(req.body)

		res.status(201).send({
			message: 'order created!',
			data: newOrder
		})
		
	} catch(err){
	  next(err);
	}
})





module.exports = router