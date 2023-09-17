const express = require('express')
const router = express.Router()

const { checkAccountandTokenandLevel } = require('../middleware/kfb')

const { Accounts, Companies, Loads } = require('../models')

router.get('/allAccounts/:token', checkAccountandTokenandLevel, async (req, res) => {
	const account = await req.account
	try {
		const accounts = await Accounts.findAll()
		if (account.level !== 100) {
			return res.status(409).json({ error: `Account does not have access to this` })
		}
		return res.status(200).json(accounts)
	} catch (error) {
		res.status(500).json({ error: `Somthing went wrong getting list of accounts :${error}` })
	}
})

router.get('/allCompanies/:token', checkAccountandTokenandLevel, async (req, res) => {
	const account = await req.account
	try {
		const companies = await Companies.findAll()
		if (account.level !== 100) {
			return res.status(409).json({ error: `Account does not have access to this` })
		}
		return res.status(200).json(companies)
	} catch (error) {
		res.status(500).json({ error: `Somthing went wrong getting list of compaines :${error}` })
	}
})

router.get('/allLoads/:token', checkAccountandTokenandLevel, async (req, res) => {
	const account = await req.account
	try {
		const loads = await Loads.findAll()
		if (account.level !== 100) {
			return res.status(409).json({ error: `Account does not have access to this` })
		}
		return res.status(200).json(loads)
	} catch (error) {
		res.status(500).json({ error: `Somthing went wrong getting list of loads :${error}` })
	}
})

module.exports = router
