const { Op } = require('sequelize')
const express = require('express')
const router = express.Router()

const { Loads, Companies } = require('../models')
const { checkAccountandToken } = require('../middleware/account')

router.post('/create/:token', checkAccountandToken, async (req, res) => {
	const account = await req.account
	const { loadInformation, pickupDetails, deliveryDetails, available } = req.body
	try {
		const company = await Companies.findOne({ where: { id: account.companyId } })
		const listOfLoads = await Loads.findAll()
		const lengthOfLoads = listOfLoads.length
		const randomNum = Math.floor(Math.random() * 1000000)
		const companyAddress = JSON.parse(company.address)
		const newLoad = await Loads.create({
			companyId: company.id,
			loadNumber: `KIND${lengthOfLoads + 1}`,
			loadInformation,
			pickupDetails,
			pickupLocation: {
				name: company.name,
				street: companyAddress.street,
				suite: companyAddress.suite,
				city: companyAddress.city,
				state: companyAddress.state,
				postal: companyAddress.postal,
			},
			deliveryDetails,
			loadLog: [
				{
					id: 1,
					event: `Load was created`,
					date: new Date(),
					account: { id: account.id, name: account.name, email: account.email },
				},
			],
			available,
			trackingNumber: `KIND${randomNum.toString().padStart(9, '0')}`,
		})
		res.status(200).json({ data: newLoad })
	} catch (error) {
		console.log(`Something went wrong creating a load. ${error}`)
	}
})

router.put('/claim/:loadNumber/:token', checkAccountandToken, async (req, res) => {
	const { loadNumber } = req.params
	const account = await req.account
	const company = await Companies.findOne({ where: { id: account.companyId } })
	const load = await Loads.findOne({ where: { loadNumber } })
	const parsedLog = JSON.parse(load.loadLog)
	if (company.type === 'shipper') {
		return res.status(409).json({ error: `You cannot claim a load as a shipper.` })
	}
	if (!load) {
		return res.status(404).json({ error: `No load found with that load number` })
	}
	const date = new Date().toISOString()
	try {
		const updateLog = {
			loadLog: {
				id: parsedLog.length + 1,
				event: 'Load was claimed',
				date: date,
				account: { id: account.id, name: account.name, email: account.email },
				company: company.id,
			},
		}
		const fullUpdate = {
			claimedBy: company.id,
			claimedOn: date,
			loadLog: [...parsedLog, updateLog],
			available: 'false',
			loadStatus: 'claimed',
		}
		const updatedLog = await Loads.update(fullUpdate, { returning: true, where: { loadNumber } })
		res.status(200).json({ message: `It worked`, data: updatedLog })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong claiming the load.. ${error}` })
	}
})

router.get('/available', async (req, res) => {
	try {
		const loads = await Loads.findAll({ where: { available: 'true' } })
		res.status(200).json(loads)
	} catch (error) {
		res.status(500).json({ error: `Soemthing went wrong getting loads : ${error}` })
	}
})

router.get('/claimedBy/:token', checkAccountandToken, async (req, res) => {
	const account = await req.account
	const company = await Companies.findOne({ where: { id: account.companyId } })
	try {
		const loads = await Loads.findAll({ where: { claimedBy: company.id } })
		res.status(200).json(loads)
	} catch (error) {
		res.status(500).json({ error: `Something went wrong getting claimed loads : ${error}` })
	}
})

router.get('/companyId/:companyId', async (req, res) => {
	const { companyId } = req.params
	try {
		const company = await Companies.findOne({ where: { id: companyId } })
		if (!company) {
			return res.status(404).json({ error: `No company found with that id` })
		}
		const listOfLoads = await Loads.findAll({ where: { companyId } })
		res.status(200).json(listOfLoads)
	} catch (error) {
		res.status(500).json({ error: `Something went wrong getting loads :${error}` })
	}
})

module.exports = router
