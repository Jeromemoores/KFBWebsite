import { Component } from 'react'
import { Formik, Form } from 'formik'

import { SignupForm, Loader } from '../../components'

import { SignupSchema } from '../../schemas/signupSchema'

import Api from '../../api/axios'
import { AccountURL } from '../../api/config'
import { Navigate } from 'react-router-dom'

export class SignupPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			inviteCode: '',
			loading: false,
		}
		this.handleFormikSubmit = this.handleFormikSubmit.bind(this)
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}

	handleFormikSubmit = async (values) => {
		this.setState({
			loading: true,
		})
		const newAccount = {
			name: values.firstName + ' ' + values.lastName,
			email: values.email,
			password: values.password,
			inviteCode: values.inviteCode,
		}
		const response = await Api.post(`${AccountURL}/signup`, newAccount)
		if (response.status === 200) {
			sessionStorage.setItem('token', response.data.data)
			setTimeout(() => {
				this.setState({
					loading: false,
				})
				window.location.href = '/'
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
					<Formik initialValues={this.state} validationSchema={SignupSchema} onSubmit={this.handleFormikSubmit}>
						{(props) => (
							<Form>
								<SignupForm {...props} />
							</Form>
						)}
					</Formik>
				)}
			</>
		)
	}
}
