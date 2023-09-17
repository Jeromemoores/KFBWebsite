const express = require('express')
const cors = require('cors')

const app = express()
const db = require('./models')
const { PORT, SECRET } = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,GET,POST,content-type,Origin,Accept')
	req.header('Access-Control-Allow-Origin', '*')
	req.header('Access-Control-Allow-Headers', 'X-Requested-With,GET,POST,content-type,Origin,Accept')
	next()
})

const AccountsRouter = require('./routes/accounts')
app.use('/account', AccountsRouter)

const CompanyRouter = require('./routes/companies')
app.use('/company', CompanyRouter)

const LoadsRouter = require('./routes/loads')
app.use('/load', LoadsRouter)

const KFBRouter = require('./routes/auth')
app.use('/kfb', KFBRouter)

const DataRouter = require('./routes/kfb')
app.use('/kfb/data', DataRouter)

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server Running on ${PORT}`)
	})
})
