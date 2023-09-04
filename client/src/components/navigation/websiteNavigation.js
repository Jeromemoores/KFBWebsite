import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Loader, MainNavbar, SignOut } from '../../components'
import { LandingPage, SignUp } from '../../pages'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'

export class WebsiteNavigation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
			isFetchingAccount: true,
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
			if (sessionStorage.getItem('token') !== null) {
				const res = await Api.get(`${AccountURL}/byToken/${sessionStorage.getItem('token')}`)
				console.log(res)
				setTimeout(() => {
					this.setState({
						account: res.data,
						isFetchingAccount: false,
					})
				}, 3000)
			} else {
				this.setState({
					isFetchingAccount: false,
				})
			}
		} catch (error) {}
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
						<Route path='/sign-out' element={<SignOut account={account} />} />
					</Routes>
				</section>
			</Router>
		)
	}
}
