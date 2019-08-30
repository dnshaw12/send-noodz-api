const express = require('express');
const router  = express.Router();
const multer = require('multer')
const MenuItem = require('../models/menuItem')
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






module.exports = router;