const express = require('express');
const router  = express.Router();
const multer = require('multer')
const Ingredient = require('../models/ingredient')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('image'), async (req, res, next) => {
	console.log("hey");
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

		res.status(200).send({
			message: `${newIngredient.name} have been created successfully!`,
			data: newIngredient
		})


	} catch(err){
	  next(err);
	}

})

module.exports = router;