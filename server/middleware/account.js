const jwt = require('jsonwebtoken')

const { Accounts } = require('../models')
const { SECRET } = require('../config')

async function checkAccountandToken(req, res, next) {
	const { token } = req.params
	try {
		const account = await Accounts.findOne({ where: { token } })
		const decodedToken = jwt.verify(token, SECRET)
		if (!account || !decodedToken) {
			return res.status(401).json({ error: `Invalid or Expired token` })
		}
		req.account = account
		next()
	} catch (error) {
		res.status(500).json({ error: `Something went wrong in middleware ${error}` })
	}
}
module.exports = { checkAccountandToken }
