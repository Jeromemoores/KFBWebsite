import { Component } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import { Eye, EyeFill } from 'react-bootstrap-icons'

import '../../style/signup.css'
import { Formik } from 'formik'

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
		const { values, handleChange, errors, touched, handleBlur, isValid, dirty } = this.props
		const { showPassword, showConfirmPassword } = this.state
		if (values.loading === true) {
			return <></>
		}
		return (
			<div className='sign-up-form'>
				<FloatingLabel label='First Name'>
					<Form.Control type='textt' name='firstName' onBlur={handleBlur} value={values.firstName} onChange={handleChange} placeholder='' />
					{errors.firstName && touched.firstName && <div className='text-danger'>{errors.firstName}</div>}
				</FloatingLabel>
				<FloatingLabel label='Last Name'>
					<Form.Control type='text' name='lastName' onBlur={handleBlur} value={values.lastName} onChange={handleChange} placeholder='' />
					{errors.lastName && touched.lastName && <div className='text-danger'>{errors.lastName}</div>}
				</FloatingLabel>
				<FloatingLabel label='Email'>
					<Form.Control type='email' name='email' onBlur={handleBlur} value={values.email} onChange={handleChange} placeholder='' />
					{errors.email && touched.email && <div className='text-danger'>{errors.email}</div>}
				</FloatingLabel>
				<FloatingLabel label='Company Invite Code'>
					<Form.Control
						type='text'
						name='inviteCode'
						value={values.inviteCode}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder='Only fill out if joining a company.'
					/>
					{errors.inviteCode && touched.inviteCode && <div className='text-danger'>{errors.inviteCode}</div>}
				</FloatingLabel>
				<FloatingLabel label='Password'>
					<Form.Control
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					<button className='show-password-button' onClick={this.handleShowPass}>
						{showPassword ? <Eye style={{ color: 'white' }} /> : <EyeFill />}
					</button>
					{errors.password && touched.password && <div className='text-danger'>{errors.password}</div>}
				</FloatingLabel>
				<FloatingLabel label='Confirm Password'>
					<Form.Control
						type={showConfirmPassword ? 'text' : 'password'}
						name='passwordConfirm'
						value={values.passwordConfirm}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					<button className='show-password-button' onClick={this.handleShowConfirmPass}>
						{showConfirmPassword ? <Eye style={{ color: 'white' }} /> : <EyeFill />}
					</button>
					{errors.passwordConfirm && touched.passwordConfirm && <div className='text-danger'>{errors.passwordConfirm}</div>}
				</FloatingLabel>
				<div className='sign-up-submit'>
					<button type='submit' disabled={!isValid || !dirty}>
						Submit
					</button>
				</div>
			</div>
		)
	}
}
