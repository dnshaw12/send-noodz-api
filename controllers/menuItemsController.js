const express = require('express');
const router  = express.Router();
const multer = require('multer')
const MenuItem = require('../models/menuItem')
const Ingredient = require('../models/ingredient')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('image'), async (req, res, next) => {
	
	try {
		
		const newMenuItem = await MenuItem.create(req.body)

		if (req.file) {	
			const filePath = './uploads/' + req.file.filename
			newMenuItem.image.data = fs.readFileSync(filePath)
			newMenuItem.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await newMenuItem.save()

		res.status(201).send({
			message: `${newMenuItem.name} have been created successfully!`,
			data: newMenuItem
		})


	} catch(err){
	  next(err);
	}
})



router.get('/', async (req, res, next) => {
	try {
		
		const menuItems = await MenuItem.find({},{image: 0}).populate('baseIngredients noodleType protein sauce')

		res.status(200).send({
			mesage: 'get all mennu items success',
			data: menuItems
		})


	} catch(err){
	  next(err);
	}
})

router.put('/:id', upload.single('image'), async (req, res, next) => {
	try {
		
		const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new: true})

		if (req.file) {
			const filePath = './uploads/' + req.file.filename
			updatedMenuItem.image.data = fs.readFileSync(filePath)
			updatedMenuItem.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await updatedMenuItem.save()

		res.status(200).send({
			message: `${updatedMenuItem.name} have been updated successfully!`,
			data: updatedMenuItem
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