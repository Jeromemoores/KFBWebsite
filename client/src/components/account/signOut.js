import { Component } from 'react'
import { ErrorToast, SuccessfullToast } from '../alerts/toasts'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'

export class Signout extends Component {
	signout = async () => {
		if (sessionStorage.getItem('token') !== null) {
			try {
				await Api.put(`${AccountURL}/signout/${sessionStorage.getItem('token')}`).then((res) => {
					if (res.status === 200) {
						sessionStorage.clear()
						window.location.reload()
					}
					console.log(res.status)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}
	componentDidMount() {
		this.signout()
	}
	render() {
		return <></>
	}
}
