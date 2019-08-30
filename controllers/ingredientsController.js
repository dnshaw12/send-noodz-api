const express = require('express');
const router  = express.Router();
const multer = require('multer')
const Ingredient = require('../models/ingredient')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

// create new ingredient

router.post('/', upload.single('image'), async (req, res, next) => {

	try {
		
		if (req.body.vegitarian === 'on') {
			req.body.vegitarian = true
		} else {
			req.body.vegitarian = false
		}

		if (req.body.vegan === 'on') {
			req.body.vegan = true
		} else {
			req.body.vegan = false
		}

		const newIngredient = await Ingredient.create(req.body)

		if (req.file) {	
			const filePath = './uploads/' + req.file.filename
			newIngredient.image.data = fs.readFileSync(filePath)
			newIngredient.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await newIngredient.save()

		console.log(newIngredient);

		res.status(201).send({
			message: `${newIngredient.name} have been created successfully!`,
			data: newIngredient
		})


	} catch(err){
	  next(err);
	}

})

// get all ingredients

router.get('/', async (req, res, next) => {

	try {

		const allIngredients = await Ingredient.find()
		console.log(allIngredients);

		res.status(200).send({
			message: 'Successfully got all Ingredients',
			data: allIngredients
		})

	} catch(err){
	  next(err);
	}
})

// delete ingredient

router.delete('/:id', async (req, res, next) => {

	try {
		
		const deletedIngredient = await Ingredient.findOneAndDelete({_id: req.params.id})

		res.status(200).send({
			message: `ingredient successfully deleted`,
			data: deletedIngredient
		})

	} catch(err){
	  next(err);
	}
})

router.put('/:id', upload.single('image'), async (req, res, next) => {
	
	try {
		
		console.log('Ingredient put hit');
		
		if (req.body.vegitarian === 'on') {
			req.body.vegitarian = true
		} else {
			req.body.vegitarian = false
		}

		if (req.body.vegan === 'on') {
			req.body.vegan = true
		} else {
			req.body.vegan = false
		}

		const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id ,req.body, {new: true})

		if (req.file) {	
			const filePath = './uploads/' + req.file.filename
			updatedIngredient.image.data = fs.readFileSync(filePath)
			updatedIngredient.image.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await updatedIngredient.save()

		console.log(updatedIngredient);

		res.status(200).send({
			message: `${updatedIngredient.name} have been updated successfully!`,
			data: updatedIngredient
		})


	} catch(err){
	  next(err);
	}

})

router.get('/:id/image', async (req, res, next) => {
	
	try {
		
		const ingredient = await Ingredient.findById(req.params.id)

		res.set('Content-Type', ingredient.image.contentType)

		res.send(ingredient.image.data)

	} catch(err){
	  next(err);
	}

})




module.exports = router;