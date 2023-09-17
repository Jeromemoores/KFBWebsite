const jwt = require('jsonwebtoken')

const { Accounts } = require('../models')
const { SECRET } = require('../config')

async function checkAccountandTokenandLevel(req, res, next) {
	const { token } = req.params
	try {
		const account = await Accounts.findOne({ where: { token } })
		const decodedToken = jwt.verify(token, SECRET)
		if (!account || !decodedToken) {
			return res.status(401).json({ error: `Invalid or Expired token` })
		}
		if (account.level !== 100 && account.companyType !== 'kfb') {
			return res.status(409).json({ error: `Account level is not permitted.` })
		}
		req.account = account
		next()
	} catch (error) {
		res.status(500).json({ error: `Something went wrong in the middleware ${error}` })
	}
}
module.exports = { checkAccountandTokenandLevel }
