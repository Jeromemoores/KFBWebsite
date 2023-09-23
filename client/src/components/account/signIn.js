import { Component } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import { Eye, EyeFill } from 'react-bootstrap-icons'

import '../../style/signup.css'

export class SigninForm extends Component {
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
				<FloatingLabel label='Email'>
					<Form.Control type='email' name='email' onBlur={handleBlur} value={values.email} onChange={handleChange} placeholder='' />
					{errors.email && touched.email && <div className='text-danger'>{errors.email}</div>}
				</FloatingLabel>
				<FloatingLabel label='Password'>
					<Form.Control
						type={showPassword ? 'text' : 'password'}
						name='password'
						onBlur={handleBlur}
						value={values.password}
						onChange={handleChange}
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
						onBlur={handleBlur}
						value={values.passwordConfirm}
						onChange={handleChange}
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
