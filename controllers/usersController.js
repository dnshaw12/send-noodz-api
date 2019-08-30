const express = require('express');
const router  = express.Router();
const multer = require('multer')
const User = require('../models/user')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})
const bcrypt  = require('bcryptjs');


router.post('/', upload.single('profilePic'), async (req, res, next) => {
	
	try {

		req.body.location = {}

		req.body.location.addr1 = req.body.addr1
		req.body.location.addr2 = req.body.addr2
		req.body.location.city = req.body.city
		req.body.location.state = req.body.state
		req.body.location.zip = req.body.zip

		req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		
		const newUser = await User.create(req.body)

		if (req.file) {	
			req.session.hasPic = true
			const filePath = './uploads/' + req.file.filename
			newUser.profilePic.data = fs.readFileSync(filePath)
			newUser.profilePic.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await newUser.save()

		res.status(201).send({
			message: 'User created successfully',
			data: newUser
		})

	} catch(err){
	  next(err);
	}


})

// get all users for testing purposes. not needed for actual app 

router.get('/', async (req, res, next) => {
	
	try {
		const users = await User.find({},{password: 0, profilePic: 0})

		res.send({data:users})
	} catch(err){
	  next(err);
	}

})

// get single user

router.get('/:id', async (req, res, next) => {
	
	try {
		
		const user = await User.findById(req.params.id, {password: 0})

		res.status(200).send({
			message:'successfully got user',
			data: user
		})

	} catch(err){
	  next(err);
	}


})




module.exports = router;