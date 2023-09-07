import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Loader, MainNavbar, Signout, CompanySignupForm, InviteCode } from '../../components'
import { LandingPage, SignupPage, SigninPage, ShipperHome, CarrierHome, OwneropHome, LoadboardPage } from '../../pages'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'

export class WebsiteNavigation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
			isFetchingAccount: false,
			error: {
				message: '',
				type: '',
			},
			notification: {
				message: '',
				type: '',
				heading: '',
			},
		}
	}
	async componentDidMount() {
		try {
			await this.fetchAccount()
		} catch (error) {
			console.log(error) // Set front end error handling here
		}
	}

	fetchAccount = async () => {
		try {
			this.setState({ isFetchingAccount: true }) // Set isFetchingAccount to true before making the request
			if (sessionStorage.getItem('token') !== null) {
				const res = await Api.get(`${AccountURL}/byToken/${sessionStorage.getItem('token')}`)
				this.setState({
					account: res.data,
					isFetchingAccount: false, // Set isFetchingAccount to false after a successful request
				})
			} else {
				this.setState({
					isFetchingAccount: false,
				})
			}
		} catch (error) {
			console.log(error)
			this.setState({ isFetchingAccount: false }) // Set isFetchingAccount to false in case of an error
		}
	}
	render() {
		const { isFetchingAccount, account } = this.state
		if (isFetchingAccount) {
			return <Loader message={'Loading Account Data'} />
		}
		return (
			<Router>
				<section id='MainNavbar'>
					<MainNavbar account={account} />
				</section>
				<section id='PageElements'>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/sign-up' element={<SignupPage account={account} />} />
						<Route path='/sign-in' element={<SigninPage account={account} />} />
						<Route path='/sign-out' element={<Signout account={account} />} />

						<Route
							path='/shipper/sign-up'
							element={<CompanySignupForm account={account} applicationType='shipper' />}
						/>
						<Route path='/shipper/home' element={<ShipperHome account={account} />} />

						<Route
							path='/carrier/sign-up'
							element={<CompanySignupForm account={account} applicationType='carrier' />}
						/>
						<Route path='/carrier/home' element={<CarrierHome account={account} />} />

						<Route path='/ownerop/sign-up' element={<CompanySignupForm applicationType='ownerop' />} />
						<Route path='/ownerop/home' element={<OwneropHome />} />

						<Route path='/loadboard' element={<LoadboardPage account={account} />} />

						{account?.level === 100 ? <Route path='/kfb/inviteCompany' element={<InviteCode />} /> : <></>}
					</Routes>
				</section>
			</Router>
		)
	}
}
