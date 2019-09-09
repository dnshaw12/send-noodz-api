const express = require('express');
const router  = express.Router();
const multer = require('multer')
const User = require('../models/user')
const fs = require('fs')
const upload = multer({dest: 'uploads/'})
const bcrypt  = require('bcryptjs');


router.post('/sign-up', upload.single('profilePic'), async (req, res, next) => {
	
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

		const sendableResponse = await User.findById(newUser._id,{profilePic: 0, password:0})

		res.status(201).send({
			message: 'User created successfully',
			data: sendableResponse
		})

	} catch(err){
	  next(err);
	}


})

router.post('/login', upload.single('profilePic'), async (req, res, next) => {

	try {
		
		const foundUser = await User.findOne({'email': req.body.email},{profilePic: 0})

		if (foundUser) {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.userId = foundUser._id;
	      	req.session.name = foundUser.name;

	      	const sendableResponse = await User.findById(foundUser._id,{profilePic: 0, password:0})

	      	console.log(sendableResponse, 'sendableResponse');

	      	res.status(200).send({
	      		message: 'user successfully logged in',
	      		data: sendableResponse
	      	})
			} else {
				res.status(400).send({
	      		message: 'user email or password incorrect',
	      		data: {}
	      	})
			}
		} else {
			res.status(400).send({
      		message: 'no user with that email',
      		data: {}
      	})
		}

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
		
		const user = await User.findById(req.params.id, {password: 0, profilePic: 0})

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


		const currentUser = await User.findById(req.params.id)

		req.body.address = {}

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
	  res.send(err)
	}

})


module.exports = router;