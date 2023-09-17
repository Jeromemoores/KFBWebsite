const express = require('express')
const router = express.Router()

const { Accounts, Companies, Auth } = require('../models')
const { checkAccountandToken } = require('../middleware/account')

router.post('/create/:authCode/:token', checkAccountandToken, async (req, res) => {
	const account = await req.account
	const { token, authCode } = req.params
	const { name, type, address, contact, additionalInformation } = req.body
	try {
		const existingCompany = await Companies.findOne({ where: { name } })
		const auth = await Auth.findOne({ where: { code: authCode } })
		if (existingCompany) {
			return res.status(409).json({ error: `Company already exists with that name` })
		}
		if (!auth || auth.used === 'true') {
			return res.status(403).json({ error: `Invite code doesn't exist or was already used` })
		}
		const newCompany = await Companies.create({
			name,
			type,
			address,
			contact,
			additionalInformation,
			employees: [
				{
					id: 1,
					accountId: account.id,
					name: `${account.name}`,
					email: `${account.email}`,
					type: `Manager`,
				},
			],
		})
		res.status(200).json({ newCompany })
		const companyId = newCompany.id
		const companyType = newCompany.type
		await Accounts.update({ companyId, companyType }, { where: { token } })
		await Auth.update({ used: 'true' }, { where: { code: authCode } })
	} catch (error) {
		res.status(500).json({ error: `Something went wrong creating the company : ${error}` })
	}
})

router.get('/findById/:id', async (req, res) => {
	const { id } = req.params
	try {
		const company = await Companies.findOne({ where: { id } })
		res.status(200).json(company)
	} catch (error) {
		res.status(500).json({ erorr: `Something went wrong finding that company : ${error}` })
	}
})

module.exports = router
