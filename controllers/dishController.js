const express = require('express');
const router  = express.Router();
const Dish = require('../models/dish')
const multer = require('multer')
const MenuItem = require('../models/menuItem')
const upload = multer({dest: 'uploads/'})

// byon id for testing = 5d6c0512034b560872b84b32

router.post('/', upload.single('image'), async (req, res, next) => {
	
	try {
		console.log(req.body, 'body in dish creator');
		
		const newDish = await Dish.create(req.body)

		res.status(201).send({
			message: 'dish successfully created',
			data: newDish
		})


	} catch(err){
	  next(err);
	}

})

router.get('/', async (req, res, next) => {
	try {
		
		const dishes = await Dish.find().populate('extraIngredients').populate({
			path: 'menuItemId',
			populate: [
				{ path: 'protein'},
				{ path: 'noodleType' },
				{ path: 'baseIngredients' }
			]
		})

		res.status(200).send({
			message: 'got all dishes',
			data: dishes
		})

	} catch(err){
	  next(err);
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		
		const deletedDish = await Dish.findByIdAndDelete(req.params.id)

		res.status(200).send({
			message: 'dish successfully deleted',
			data: deletedDish
		})

	} catch(err){
	  next(err);
	}
})

router.put('/:id', upload.single('image'), async (req, res, next) => {
	
	try {

		console.log(req.body, 'body in update dish!', req.params.id);
		
		const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true })

		res.status(200).send({
			message: 'dish successfully updated',
			data: updatedDish
		})

	} catch(err){
	  next(err);
	}

})




module.exports = router;