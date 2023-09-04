import { Component } from 'react'

import { SignUpForm, Loader } from '../../components'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'
import { Navigate } from 'react-router-dom'

export class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			companyAuthCode: '',
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
		const newAccount = {
			name: values.firstName + ' ' + values.lastName,
			email: values.email,
			password: values.password,
			companyAuthCode: values.companyAuthCode,
		}
		const response = await Api.post(`${AccountURL}/signup`, newAccount)
		if (response.status === 200) {
			sessionStorage.setItem('token', response.data.data)
			setTimeout(() => {
				this.setState({
					loading: false,
				})
			}, 2000)
		} else {
			console.log('Something went wrong')
		}
	}

	render() {
		const { ...values } = this.state
		const { account } = this.props
		if (values.loading === true) {
			return <Loader message={'Awaiting Account Creation'} />
		}
		return (
			<>
				{account ? (
					<Navigate to='/' replace={true} />
				) : (
					<SignUpForm values={values} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
				)}
			</>
		)
	}
}
