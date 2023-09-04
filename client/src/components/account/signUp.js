import { Component } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import { Eye, EyeFill } from 'react-bootstrap-icons'

import '../../style/signup.css'

export class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showPassword: false,
			showConfirmPassword: false,
		}
	}
	handleShowPass = () => {
		this.setState((prevState) => ({
			showPassword: !prevState.showPassword,
		}))
	}
	handleShowConfirmPass = () => {
		this.setState((prevState) => ({
			showConfirmPassword: !prevState.showConfirmPassword,
		}))
	}
	render() {
		const { values, handleChange, handleSubmit } = this.props
		const { showPassword, showConfirmPassword } = this.state
		if (values.loading === true) {
			return <></>
		}
		return (
			<div className='signupform'>
				<FloatingLabel label='First Name'>
					<Form.Control
						type='first-name'
						name='firstName'
						value={values.firstName}
						onChange={handleChange('firstName')}
						placeholder=''
					/>
				</FloatingLabel>
				<FloatingLabel label='Last Name'>
					<Form.Control
						type='last-name'
						name='lastName'
						value={values.lastName}
						onChange={handleChange('lastName')}
						placeholder=''
					/>
				</FloatingLabel>
				<FloatingLabel label='Email'>
					<Form.Control
						type='email'
						name='email'
						value={values.email}
						onChange={handleChange('email')}
						placeholder=''
					/>
				</FloatingLabel>
				<FloatingLabel label='Company Join Code'>
					<Form.Control
						type='text'
						name='companyAuth'
						value={values.companyAuth}
						onChange={handleChange('companyAuth')}
						placeholder='Only fill out if joining a company.'
					/>
				</FloatingLabel>
				<FloatingLabel label='Password'>
					<Form.Control
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={values.password}
						onChange={handleChange('password')}
						placeholder=''
					/>
					<button className='showPasswordButton' onClick={this.handleShowPass}>
						{showPassword ? <Eye style={{ color: 'white' }} /> : <EyeFill />}
					</button>
				</FloatingLabel>
				<FloatingLabel label='Confirm Password'>
					<Form.Control
						type={showConfirmPassword ? 'text' : 'password'}
						name='passwordConfirm'
						value={values.passwordConfirm}
						onChange={handleChange('passwordConfirm')}
						placeholder=''
					/>
					<button className='showPasswordButton' onClick={this.handleShowConfirmPass}>
						{showConfirmPassword ? <Eye style={{ color: 'white' }} /> : <EyeFill />}
					</button>
				</FloatingLabel>
				<div className='signupSubmit'>
					<button onClick={handleSubmit} disabled={values.password === values.passwordConfirm ? false : true}>
						Submit
					</button>
				</div>
			</div>
		)
	}
}
