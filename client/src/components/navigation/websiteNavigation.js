import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Loader, MainNavbar, SignOut } from '../../components'
import { LandingPage, SignUp, SignInPage } from '../../pages'

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
						<Route path='/sign-up' element={<SignUp account={account} />} />
						<Route path='/sign-in' element={<SignInPage account={account} />} />
						<Route path='/sign-out' element={<SignOut account={account} />} />
					</Routes>
				</section>
			</Router>
		)
	}
}
