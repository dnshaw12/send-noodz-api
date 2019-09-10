const express = require('express');
const router  = express.Router();
const multer = require('multer')
const MenuItem = require('../models/menuItem')
const Ingredient = require('../models/ingredient')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('image'), async (req, res, next) => {
	
	try {

		if (req.body.baseIngredients) {

			req.body.baseIngredients = JSON.parse(req.body.baseIngredients)
		}

		
		const newMenuItem = await MenuItem.create(req.body)

		if (req.file) {	
			const filePath = './uploads/' + req.file.filename
			newMenuItem.image.data = fs.readFileSync(filePath)
			newMenuItem.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await newMenuItem.save()

		const sendableResponse = await MenuItem.findById(newMenuItem._id,{image: 0}).populate('baseIngredients noodleType protein sauce')

		res.status(201).send({
			message: `${sendableResponse.name} have been created successfully!`,
			data: sendableResponse
		})


	} catch(err){
	  next(err);
	}
})



router.get('/', async (req, res, next) => {
	try {
		
		const menuItems = await MenuItem.find({},{image: 0}).populate('baseIngredients noodleType protein sauce', '-image')

		res.status(200).send({
			mesage: 'get all menu items success',
			data: menuItems
		})


	} catch(err){
	  next(err);
	}
})

router.put('/:id', upload.single('image'), async (req, res, next) => {
	try {

		req.body.baseIngredients = JSON.parse(req.body.baseIngredients)
		
		const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new: true})

		if (req.file) {
			const filePath = './uploads/' + req.file.filename
			updatedMenuItem.image.data = fs.readFileSync(filePath)
			updatedMenuItem.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await updatedMenuItem.save()

		const sendableResponse = await MenuItem.findById(updatedMenuItem._id,{image: 0}).populate('baseIngredients noodleType protein sauce')

		res.status(200).send({
			message: `${sendableResponse.name} have been updated successfully!`,
			data: sendableResponse
		})


	} catch(err){
	  next(err);
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		
		const deletedMenuItem = await MenuItem.findOneAndDelete({_id: req.params.id})

		res.status(200).send({
			message: `menu item successfully deleted`,
			data: deletedMenuItem
		})

	} catch(err){
	  next(err);
	}
})


module.exports = router;