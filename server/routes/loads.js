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
		const companyAdress = JSON.parse(company.address)
		const newLoad = await Loads.create({
			companyId: company.id,
			loadNumber: `KIND${lengthOfLoads + 1}`,
			loadInformation,
			pickupDetails,
			pickupLocation: {
				street: companyAdress.street,
				suite: companyAdress.suite,
				city: companyAdress.city,
				state: companyAdress.state,
				postal: companyAdress.postal,
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

module.exports = router
