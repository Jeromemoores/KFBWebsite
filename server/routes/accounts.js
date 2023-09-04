const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Accounts } = require('../models')
const { SECRET } = require('../config')

router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body
	try {
		const existingEmail = await Accounts.findOne({ where: { email } })
		if (existingEmail) {
			return res.status(409).json({ error: `Email already in use. Contant support if someone is using your email.` })
		}
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const newAccount = await Accounts.create({
			name,
			email,
			password: hashedPassword,
			ipAddress: '0.0.0.0:0000',
		})
		const auth = newAccount.authId
		const token = jwt.sign({ auth }, SECRET, { expiresIn: '1h' })
		await Accounts.update({ token }, { where: { email } })
		res.status(200).json({ data: token })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong making an account : ${error}` })
	}
})

router.get('/byToken/:token', async (req, res) => {
	const { token } = req.params
	try {
		const decodedToken = jwt.verify(token, SECRET)
		const account = await Accounts.findOne({ where: { token } })
		if (!decodedToken || !account) {
			return res.status(401).json({ error: `Invalid or Expired token. Please sign in.` })
		} else {
			const response = {
				id: account.id,
				name: account.name,
				email: account.email,
				company: account.companyId,
				companyType: account.companyType,
			}
			res.status(200).json(response)
		}
	} catch (error) {
		res.status(500).json({ error: `Something went wrong finding that account. ${error}` })
	}
})

module.exports = router
