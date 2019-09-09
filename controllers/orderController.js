const express = require('express');
const router  = express.Router();
const multer = require('multer')
const Order = require('../models/order')
const Dish = require('../models/dish')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('image'), async (req, res, next) => {

	try {

		req.body.address = {}

		req.body.address.addr1 = req.body.addr1
		req.body.addr2 ? req.body.address.addr2 = req.body.addr2 : req.body.address.addr2 = null
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip

		req.body.dishes = await Dish.find({_id:{$in:req.body.dishes}})

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

router.get('/active', async (req, res, next) => {
	try {
		
		const orders = await Order.find({status: { $nin: ['archived', 'pending']}}).populate('userId', 
				{
					profilePic: 0,
					password: 0
				})
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' },
					{ path: 'sauce' }
				]
			})

		res.status(200).send({
			message: 'got active orders',
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
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' },
					{ path: 'sauce' }
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

router.get('/:userId/past', async (req, res, next) => {
	try {
		
		const orders = await Order.find({uesrId: req.params.id, status: 'archived'}).populate('userId', 
				{
					profilePic: 0,
					password: 0
				})
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' },
					{ path: 'sauce' }
				]
			})

		res.status(200).send({
			message: 'got one order',
			data: orders
		})

	} catch(err){
	  next(err);
	}
})

router.get('/:userId/active', async (req, res, next) => {
	try {
		
		const orders = await Order.find({uesrId: req.params.id, status: { $nin: ['archived', 'pending']}}).populate('userId', 
				{
					profilePic: 0,
					password: 0
				})
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' },
					{ path: 'sauce' }
				]
			})

		res.status(200).send({
			message: 'got one order',
			data: orders
		})

	} catch(err){
	  next(err);
	}
})


router.put('/:id', upload.single('image'), async (req, res, next) => {

	try {
		// console.log(req.body, 'req.body in order put');

		req.body.address = {}

		req.body.address.addr1 = req.body.addr1
		req.body.address.addr2 = req.body.addr2
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip

		if (req.body.dishes) {
			req.body.dishes = await Dish.find({_id:{$in:req.body.dishes}})
		}


		if (req.body.status === 'received') {
			console.log('io new order test');

			req.io.emit('new order', req.body)

		}
		
		let updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true})

		updatedOrder = await Order.findById(req.params.id).populate('userId', 
				{
					profilePic: 0,
					password: 0
				})
			.populate({
				path: 'dishes.menuItemId',
				populate: [
					{ path: 'protein'},
					{ path: 'noodleType' },
					{ path: 'baseIngredients' },
					{ path: 'sauce' }
				]
			})

		res.status(200).send({
			message: 'order has been updated successfully',
			data: updatedOrder
		})

	} catch(err){
	  next(err);
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		
		const deletedOrder = await Order.findByIdAndDelete(req.params.id)

		res.status(200).send({
			message: 'order successfully deleted',
			data: deletedOrder
		})

	} catch(err){
	  next(err);
	}
})
// 5d6ec84453c292187c1025c0 - byon
// 5d6ec7f953c292187c1025be - cust. nood
// 5d6ec7fe53c292187c1025bf - cust. protein

module.exports = router