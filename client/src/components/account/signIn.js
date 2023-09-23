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
		const { values, handleChange, handleSubmit } = this.props
		const { showPassword, showConfirmPassword } = this.state
		if (values.loading === true) {
			return <></>
		}
		return (
			<div className='sign-up-form'>
				<FloatingLabel label='Email'>
					<Form.Control type='email' name='email' value={values.email} onChange={handleChange('email')} placeholder='' />
				</FloatingLabel>
				<FloatingLabel label='Password'>
					<Form.Control
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={values.password}
						onChange={handleChange('password')}
						placeholder=''
					/>
					<button className='show-password-button' onClick={this.handleShowPass}>
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
					<button className='show-password-button' onClick={this.handleShowConfirmPass}>
						{showConfirmPassword ? <Eye style={{ color: 'white' }} /> : <EyeFill />}
					</button>
				</FloatingLabel>
				<div className='sign-up-submit'>
					<button onClick={handleSubmit} disabled={values.password === values.passwordConfirm ? false : true}>
						Submit
					</button>
				</div>
			</div>
		)
	}
}
