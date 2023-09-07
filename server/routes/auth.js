const express = require('express')
const router = express.Router()

const { Auth } = require('../models')
const { checkAccountandToken } = require('../middleware/account')

router.post('/newInvite/:token', checkAccountandToken, async (req, res) => {
	const account = req.account
	try {
		if (account.level !== 100) {
			res.status(403).json({ error: `You cannot do this sneaky boi` })
		}
		const newCode = await Auth.create({ creator: account.id })
		res.status(200).json({ data: newCode.code })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong creating the code.` })
	}
})

module.exports = router
