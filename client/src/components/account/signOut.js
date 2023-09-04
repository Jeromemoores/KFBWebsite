import { Component } from 'react'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'
import { Navigate } from 'react-router-dom'

export class SignOut extends Component {
	constructor(props) {
		super(props)
		this.state = {
			signingOut: true,
		}
	}
	async componentDidMount() {
		const token = sessionStorage.getItem('token')
		if (token !== null) {
			try {
				await Api.put(`${AccountURL}/signout/${token}`).then((res) => {
					if (res.status === 400 || res.status === 500) {
						console.log(res)
					} else {
						setTimeout(() => {
							sessionStorage.clear()
							this.setState({
								signingOut: false,
							})
						}, 500)
						sessionStorage.clear()
					}
				})
			} catch (error) {
				console.log(error)
			}
		}
	}
	render() {
		const { signingOut } = this.state
		const { account } = this.props
		return signingOut === false ? account === null ? <Navigate to='/' replace={true} /> : null : null
	}
}
