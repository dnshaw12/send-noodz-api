const express = require('express');
const router  = express.Router();
const multer = require('multer')
const User = require('../models/user')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})
const bcrypt  = require('bcryptjs');


router.post('/', upload.single('profilePic'), async (req, res, next) => {

	console.log(req.body.things);
	
	try {

		req.body.address = {}

		req.body.address.addr1 = req.body.addr1
		req.body.addr2 ? req.body.address.addr2 = req.body.addr2 : req.body.address.addr2 = null
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip

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

router.put('/:id', upload.single('profilePic'), async (req, res, next) => {
	
	try {

		console.log('user put');

		const currentUser = await User.findById(req.params.id)

		req.body.address = {}
		console.log(currentUser);
		console.log(req.body);

		req.body.address.addr1 = req.body.addr1
		req.body.address.addr2 = req.body.addr2
		req.body.address.city = req.body.city
		req.body.address.state = req.body.state
		req.body.address.zip = req.body.zip

		if (req.body.password) {
			req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
		}  
		
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

		if (req.file) {
			const filePath = './uploads/' + req.file.filename
			updatedUser.profilePic.data = fs.readFileSync(filePath)
			updatedUser.profilePic.contentType = req.file.mimetype

			fs.unlinkSync(filePath)
		}

		await updatedUser.save()

		res.status(201).send({
			message: 'User updated successfully',
			data: updatedUser
		})

	} catch(err){
	  next(err);
	}


})

router.get('/:id/profilePic', async (req, res, next) => {
	
	try {
		
		const user = await User.findById(req.params.id)

		res.set('Content-Type', user.profilePic.contentType)

		res.send(user.profilePic.data)

	} catch(err){
	  next(err);
	}

})


module.exports = router;