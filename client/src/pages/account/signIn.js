import { Component } from 'react'
import { Navigate } from 'react-router-dom'

import { SigninForm, Loader } from '../../components'
import Api from '../../api/axios'
import { AccountURL } from '../../api/config'

export class SigninPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			passwordConfirm: '',
			loading: false,
		}
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		this.setState({
			loading: true,
		})
		const { ...values } = this.state
		const account = {
			email: values.email,
			password: values.password,
		}
		const response = await Api.put(`${AccountURL}/signin`, account)
		if (response.status === 200) {
			sessionStorage.setItem('token', response.data.data)
			this.setState({
				loading: false,
			})
		} else {
			console.log('Something went wrong')
		}
	}

	componentDidUpdate() {
		const token = sessionStorage.getItem('token')
		if (token !== null) {
			window.location.href = '/'
		}
	}
	render() {
		const { ...values } = this.state
		const { account } = this.props
		if (values.loading === true) {
			return <Loader message={'Logging In & getting account information.'} />
		}
		return (
			<>
				{account ? (
					<Navigate to='/' replace={true} />
				) : (
					<SigninForm values={values} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
				)}
			</>
		)
	}
}
