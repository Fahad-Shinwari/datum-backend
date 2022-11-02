const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Auth')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const changePassword = asyncWrapper(async (req, res, next) => {
    const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return next(createCustomError(`Invalid password`, 404))
	}

	if (plainTextPassword.length < 5) {
		return next(createCustomError(`Password too small. Should be atleast 6 characters`, 404))
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		return next(createCustomError(`${error}`, 404))
	}
})

const login = asyncWrapper(async (req, res, next) => {
	const { username, password } = req.body
	let user = await User.findOne({ username })
	
	if (!user) {
        return next(createCustomError(`Invalid username/password`, 404))
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			process.env.JWT_SECRET
		)
		console.log(user);
		const permissions = user.permissions
		return res.json({ status: 'ok', data: token,user,permissions })
	}
    return next(createCustomError(`Invalid username/password`, 404))
})

const register = asyncWrapper(async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
        return next(createCustomError(`Invalid username`, 404))
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return next(createCustomError(`Invalid password`, 404))        
	}

	if (plainTextPassword.length < 5) {
        return next(createCustomError(`Password too small. Should be atleast 6 characters`, 404))        
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const permissions = ["post_list","category_list"]
		const response = await User.create({
			username,
			password,
			permissions
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
            return next(createCustomError(`Username already in use`, 404))
		}
		throw error
	}

	res.json({ status: 'A New User Has Been Created' })
})

const google = asyncWrapper(async (req, res) => {
	console.log("first")
	const { token }  = JSON.parse(req.body.body) 
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
	try {		
    const { name:username, email, picture } = ticket.getPayload();
	const user = await User.findOne({ username })
	const password = await bcrypt.hash(email, 10)
	const permissions = ["post_list","category_list"]
	if (!user) {
		const response = await User.create({
			username,
			password,
			permissions
		})
		const token = jwt.sign(
			{
				id: response._id,
				username: response.username
			},
			process.env.JWT_SECRET
		)
		console.log(response);

		return res.json({ status: 'ok', data: token, name: response,permissions: response.permissions  })
	}else if(await bcrypt.compare(email, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			process.env.JWT_SECRET
		)
		console.log(user);
		return res.json({ status: 'ok', data: token,name: user,permissions: user.permissions })
	}


	} catch (error) {
			// duplicate key
            return next(createCustomError(`No data found`, 404))
	}
})

const getAllUsers = asyncWrapper(async (req, res) => {
    const user = await User.find({ _id: { $ne: req.params.id } }).sort({_id: -1}).select(['-password'])
    res.status(200).json({ user })
})

const updateUsersPermissions = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;
    const user = await User.findOneAndUpdate({ _id: userID }, {$push: {permissions: req.body.permissions}}, {
      new: true,
      runValidators: true,
    })
  
    if (!user) {
      return next(createCustomError(`No category with id : ${userID}`, 404))
    }
  
    res.status(200).json({ user })
})

const deleteUsersPermissions = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;
    const user = await User.findOneAndUpdate({ _id: userID }, {$pull: {permissions: req.body.permissions}}, { new: true })
  
    if (!user) {
      return next(createCustomError(`No category with id : ${userID}`, 404))
    }
  
    res.status(200).json({ user })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID }).select(['-password'])

    if (!user) {
        return next(createCustomError(`No task with id : ${userID}`, 404))
    }
  
    res.status(200).json({ user })
})

module.exports = {
    changePassword,
    login,
    register,
	google,
	getAllUsers,
	updateUsersPermissions,
	deleteUsersPermissions,
	getSingleUser
  }