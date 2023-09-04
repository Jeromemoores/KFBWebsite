import { Component } from 'react'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'
import { Navigate } from 'react-router-dom'

export class SignOut extends Component {
	async componentDidMount() {
		if (sessionStorage.getItem('token') !== null) {
			try {
				await Api.put(`${AccountURL}/signout/${sessionStorage.getItem('token')}`)
					.then((res) => {
						if (res.status !== 200) {
							console.log(res)
						}
					})
					.then(sessionStorage.clear())
					.catch((error) => {
						console.log(error)
					})
			} catch (error) {
				console.error(error)
			}
		}
	}
	render() {
		return <></>
	}
}
