const jwt = require('jsonwebtoken')

const { Accounts } = require('../models')
const { SECRET } = require('../config')

async function checkAccountandToken(req, res, next) {
	const { token } = req.params
	if (!token) {
		return res.status(400).json({ error: 'Token not provided' })
	}
	let decodedToken
	try {
		decodedToken = jwt.verify(token, SECRET)
	} catch (err) {
		return res.status(401).json({ error: `Token verification failed: ${err.message}` })
	}
	try {
		const account = await Accounts.findOne({ where: { token } })
		if (!account) {
			return res.status(401).json({ error: 'Account not found for provided token' })
		}
		req.account = account
		req.decodedToken = decodedToken // Attaching decodedToken to the request
		next()
	} catch (error) {
		res.status(500).json({ error: `Something went wrong in middleware ${error}` })
	}
}
module.exports = { checkAccountandToken }
