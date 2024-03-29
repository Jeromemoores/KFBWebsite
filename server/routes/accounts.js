const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Accounts, Companies } = require('../models')
const { checkAccountandToken } = require('../middleware/account')
const { SECRET } = require('../config')

router.post('/signup', async (req, res) => {
	const { name, email, password, inviteCode } = req.body
	try {
		const existingEmail = await Accounts.findOne({ where: { email } })
		let companyId = null
		let companyEmployees = []
		let companyType = null
		if (inviteCode) {
			const company = await Companies.findOne({ where: { inviteCode } })
			if (!company) {
				return res.status(409).json({ error: `Invalid invite code.` })
			}
			companyId = company.id
			companyType = company.companyType
			companyEmployees = JSON.parse(company.employees)
		}
		if (existingEmail) {
			return res.status(409).json({ error: `Email already in use. Contant support if someone is using your email.` })
		}
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const newAccount = await Accounts.create({
			name,
			email,
			password: hashedPassword,
			ipAddress: (req.headers['x-forwarded-for'] || '').split(',').shift() || req.ip,
			companyId: companyId,
			companyType: companyType,
		})
		if (companyId) {
			const newEmployee = {
				id: companyEmployees.length + 1,
				accountId: newAccount.id,
				name: newAccount.name,
				email: newAccount.email,
				type: 'Employee',
			}
			const updatedEmployee = [...companyEmployees, newEmployee]
			await Companies.update({ employees: updatedEmployee }, { where: { id: companyId } })
		}
		const auth = newAccount.authId
		const token = jwt.sign({ auth }, SECRET, { expiresIn: '1d' })
		await Accounts.update({ token }, { where: { email } })
		res.status(200).json({ data: token })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong making an account : ${error}` })
	}
})

router.put('/signin', async (req, res) => {
	const { email, password } = req.body
	try {
		const account = await Accounts.findOne({ where: { email } })
		if (!account || !bcrypt.compareSync(password, account.password)) {
			return res.status(403).json({ error: `Invalid Credentials` })
		} else {
			const auth = account.authId
			const token = jwt.sign({ auth }, SECRET, { expiresIn: '1d' })
			const ipAddress = (req.headers['x-forwarded-for'] || '').split(',').shift() || req.ip
			await Accounts.update({ token, ipAddress }, { where: { email } })
			res.status(200).json({ data: token })
		}
	} catch (error) {
		return res.status(500).json({ error: `Something went wrong signing in : ${error}` })
	}
})

router.get('/byToken/:token', checkAccountandToken, async (req, res) => {
	const account = req.account
	try {
		if (!account) {
			return res.status(401).json({ error: `Invalid or Expired token. Please sign in.` })
		} else {
			const response = {
				id: account.id,
				name: account.name,
				email: account.email,
				company: account.companyId,
				companyType: account.companyType,
				level: account.level,
			}
			res.status(200).json(response)
		}
	} catch (error) {
		res.status(500).json({ error: `Something went wrong finding that account. ${error}` })
	}
})

router.put('/signout/:token', checkAccountandToken, async (req, res) => {
	const account = req.account
	try {
		if (!account) {
			return res.status(401).json({ error: `Invalid or Expired token.` })
		}
		await Accounts.update({ token: null }, { where: { token: account.token } })
		res.status(200).json({ message: 'Signed out successfully' })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong server : ${error}` })
	}
})

module.exports = router
