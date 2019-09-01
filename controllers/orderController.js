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

router.get('/', async (req, res, next) => {
	try {
		
		const orders = await Order.find()

		res.status(200).send({
			message: "got all orders",
			data: orders
		})

	} catch(err){
	  next(err);
	}
})

// order id for testing : 5d6c565b3f623709acf7ff0e

router.get('/:id', async (req, res, next) => {
	try {
		
		const order = await Order.findById(req.params.id).populate('userId', 
				{
					profilePic: 0,
					password: 0
				})
			.populate('dishes.extraIngredients')
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' }
				]
			})

		res.status(200).send({
			message: 'got one order',
			data: order
		})

	} catch(err){
	  next(err);
	}
})

router.put('/:id', upload.single('image'), async (req, res, next) => {

	try {

		req.body.address = {}

		req.body.address.addr1 = req.body.addr1
		req.body.address.addr2 = req.body.addr2
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip
		
		const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true})

		res.status(200).send({
			message: 'order has been updated successfully',
			data: updatedOrder
		})

	} catch(err){
	  next(err);
	}
})

module.exports = router