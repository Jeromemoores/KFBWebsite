import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Loader, MainNavbar, Signout, CompanySignupForm, NoAccess } from '../../components'
import { LandingPage, SignupPage, SigninPage, ShipperHome, CarrierHome, OwneropHome, LoadboardPage, KFBHome } from '../../pages'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'

export class WebsiteNavigation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
			isFetchingAccount: false,
		}
	}
	async componentDidMount() {
		if (sessionStorage.getItem('token') !== null) {
			await this.fetchAccount()
		}
	}
	fetchAccount = async () => {
		this.setState({ isFetchingAccount: true })
		try {
			const res = await Api.get(`${AccountURL}/byToken/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				this.setState({
					isFetchingAccount: false,
					account: res.data,
				})
			} else {
				this.setState({
					isFetchingAccount: false,
				})
			}
		} catch (error) {
			this.setState({
				isFetchingAccount: false,
			})
		}
	}
	render() {
		const { isFetchingAccount, account } = this.state
		if (isFetchingAccount) {
			return <Loader message={'Loading Account Data'} />
		}
		return (
			<Router>
				<ToastContainer />
				<section id='main-navbar'>
					<MainNavbar account={account} />
				</section>
				<section id='PageElements'>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/sign-up' element={<SignupPage account={account} />} />
						<Route path='/sign-in' element={<SigninPage account={account} />} />
						<Route path='/sign-out' element={<Signout account={account} />} />

						<Route path='/shipper/sign-up' element={<CompanySignupForm account={account} applicationType='shipper' />} />
						<Route path='/shipper/home' element={<ShipperHome account={account} />} />

						<Route path='/carrier/sign-up' element={<CompanySignupForm account={account} applicationType='carrier' />} />
						<Route path='/carrier/home' element={<CarrierHome account={account} />} />

						<Route path='/ownerop/sign-up' element={<CompanySignupForm applicationType='ownerop' />} />
						<Route path='/ownerop/home' element={<OwneropHome account={account} />} />

						<Route path='/loadboard' element={<LoadboardPage account={account} />} />
						{account?.level === 100 && account?.companyType === 'kfb' ? (
							<Route path='/kfb-home' element={<KFBHome />} />
						) : (
							<Route path='/kfb/loads' element={<NoAccess />} />
						)}
						<Route path='*' element={<NoAccess />} />
					</Routes>
				</section>
			</Router>
		)
	}
}
