const express = require('express')
const router = express.Router()

const { Auth } = require('../models')
// const { checkAccountandToken } = require('../middleware/account')
const { checkAccountandTokenandLevel } = require('../middleware/kfb')

router.post('/newInvite/:token', checkAccountandTokenandLevel, async (req, res) => {
	const account = req.account
	try {
		if (account.level !== 100 && account.accountType !== 'kfb') {
			res.status(403).json({ error: `You cannot do this sneaky boi` })
		}
		const newCode = await Auth.create({ creator: account.id })
		res.status(200).json({ data: newCode })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong creating the code.` })
	}
})

router.get('/invites/:token', checkAccountandTokenandLevel, async (req, res) => {
	const account = req.account
	try {
		if (account.level !== 100 && account.accountType !== 'kfb') {
			res.status(403).json({ error: `You cannot do this sneaky boi` })
		}
		const codes = await Auth.findAll()
		res.status(200).json(codes)
	} catch (error) {
		res.status(500).json({ erorr: `Something went wrong getting list of codes` })
	}
})

router.delete('/invite/:token/:id', checkAccountandTokenandLevel, async (req, res) => {
	const account = req.account
	const { id } = req.params
	try {
		if (account.level !== 100 && account.accountType !== 'kfb') {
			res.status(403).json({ error: `You cannot do this sneaky boi` })
		}
		await Auth.destroy({ where: { id } })
		res.status(200).json({ message: 'Code was deleted' })
	} catch (error) {
		res.status(500).json({ erorr: `Something went wrong getting list of codes` })
	}
})
module.exports = router
