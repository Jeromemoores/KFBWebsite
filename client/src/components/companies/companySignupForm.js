import { Component } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { AddressAutofill } from '@mapbox/search-js-react'

import { ErrorToast, SuccessfullToast } from '../alerts/toasts'

import { Loader } from '../../components'

import Api from '../../api/axios'
import { CompanyURL } from '../../api/config'

import '../../style/signup.css'

export class CompanySignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			applicationType: null,
			name: '',
			street: '',
			suite: '',
			city: '',
			state: '',
			postal: '',
			contactName: '',
			contact: '',
			authCode: '',
			dotNumber: '',
			licenseNumber: '',
			licenseState: '',
			licenseIssue: '',
			licenseExpiration: '',
			additional6: '',
			additional7: '',
			additional8: '',
		}
	}
	componentDidMount() {
		this.checkCompanyType()
	}
	checkCompanyType = async () => {
		const { applicationType } = this.props
		if (applicationType === 'shipper') {
			this.setState({
				applicationType: 'shipper',
			})
		} else if (applicationType === 'carrier') {
			this.setState({
				applicationType: 'carrier',
			})
		} else if (applicationType === 'ownerop') {
			this.setState({
				applicationType: 'ownerop',
			})
		} else {
			console.log(`This shouldn't happen`)
		}
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		this.setState({
			loading: true,
		})
		if (e.key === 'Enter') {
			e.preventDefault()
		}
		this.setState({ loading: true })
		const { ...values } = this.state
		const newCompany = {
			name: values.name,
			type: values.applicationType,
			address: {
				street: values.street,
				suite: values.suite,
				city: values.city,
				state: values.state,
				postal: values.postal,
			},
			contact: {
				name: values.contactName,
				contact: values.contact,
			},
			authCode: values.authCode,
			additionalInformation: {
				dotNumber: values.dotNumber,
				licenseNumber: values.licenseNumber,
				licenseState: values.licenseState,
				licenseIssue: values.licenseIssue,
				licenseExpiration: values.licenseExpiration,
				additional6: values.additional6,
				additional7: values.additional7,
				additional8: values.additional8,
			},
		}
		try {
			const res = await Api.post(`${CompanyURL}/create/${values.authCode}/${sessionStorage.getItem('token')}`, newCompany)
			if (res.status === 200) {
				this.setState({ loading: false })
				SuccessfullToast('Signing up was successfull... Redirecting')
				setTimeout(() => {
					window.location.href = '/'
				}, 2200)
			} else {
				this.setState({
					loading: false,
				})
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			this.setState({
				loading: false,
			})
			ErrorToast(`Something went wrong: ${error}`)
		}
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}
	render() {
		const { ...values } = this.state
		if (values.loading === true) {
			return <Loader message={'Awaiting Company Creation'} />
		}
		return (
			<div className='company-sign-up'>
				<Form>
					<FloatingLabel label='Company Name'>
						<Form.Control type='text' name='name' value={values.name} onChange={this.handleChange('name')} placeholder='' />
					</FloatingLabel>
					<AddressAutofill accessToken='pk.eyJ1IjoiaGV5aXRzbWVqIiwiYSI6ImNsZWNrZTBnMzAwNnczb3FvaTJyNHZ0cmkifQ.ggiC-ULgV-LGObqZzLuW2g'>
						<FloatingLabel label='Street'>
							<Form.Control
								type='text'
								name='street'
								value={values.street}
								onChange={this.handleChange('street')}
								placeholder=''
								autoComplete='address-line1'
							/>
						</FloatingLabel>
					</AddressAutofill>

					<FloatingLabel label='Suite / Building Number'>
						<Form.Control
							type='text'
							name='suite'
							value={values.suite}
							onChange={this.handleChange('suite')}
							placeholder='55235'
							autoComplete='address-line2'
						/>
					</FloatingLabel>
					<FloatingLabel label='City'>
						<Form.Control
							type='text'
							name='city'
							value={values.city}
							onChange={this.handleChange('city')}
							placeholder='55235'
							autoComplete='address-level2'
						/>
					</FloatingLabel>
					<FloatingLabel label='Zip Code'>
						<Form.Control
							type='text'
							name='postal'
							value={values.postal}
							onChange={this.handleChange('postal')}
							placeholder='55235'
							autoComplete='postal-code'
						/>
					</FloatingLabel>
					<FloatingLabel label='State'>
						<Form.Control
							type='text'
							name='state'
							value={values.state}
							onChange={this.handleChange('state')}
							placeholder='55235'
							autoComplete='address-level1'
						/>
					</FloatingLabel>
					<FloatingLabel label='Company Contact Name'>
						<Form.Control type='text' name='contactName' value={values.contactName} onChange={this.handleChange('contactName')} placeholder='' />
					</FloatingLabel>
					<FloatingLabel label='Company Contact Email or Number'>
						<Form.Control type='text' name='contact' value={values.contact} onChange={this.handleChange('contact')} placeholder='' />
					</FloatingLabel>
					<FloatingLabel label='Paste Auth Code'>
						<Form.Control type='text' name='authCode' value={values.authCode} onChange={this.handleChange('authCode')} placeholder='' />
					</FloatingLabel>
					{values.applicationType !== 'shipper' ? (
						<>
							<FloatingLabel label='DOT Number | MC Number'>
								<Form.Control type='text' name='dotNumber' value={values.dotNumber} onChange={this.handleChange('dotNumber')} placeholder='' />
							</FloatingLabel>
						</>
					) : (
						<></>
					)}
					{values.applicationType === 'ownerop' ? (
						<>
							<FloatingLabel label='License Number'>
								<Form.Control
									type='text'
									name='licenseNumber'
									value={values.licenseNumber}
									onChange={this.handleChange('licenseNumber')}
									placeholder=''
								/>
							</FloatingLabel>
							<FloatingLabel label='License State'>
								<Form.Control
									type='text'
									name='licenseState'
									value={values.licenseState}
									onChange={this.handleChange('licenseState')}
									placeholder=''
								/>
							</FloatingLabel>
							<FloatingLabel label='License Issue Date'>
								<Form.Control
									type='date'
									name='licenseIssue'
									value={values.licenseIssue}
									onChange={this.handleChange('licenseIssue')}
									placeholder=''
								/>
							</FloatingLabel>
							<FloatingLabel label='License Expiration Date'>
								<Form.Control
									type='date'
									name='licenseExpiration'
									value={values.licenseExpiration}
									onChange={this.handleChange('licenseExpiration')}
									placeholder=''
								/>
							</FloatingLabel>
						</>
					) : (
						<></>
					)}
				</Form>
				<button onClick={this.handleSubmit} disabled={values.authCode !== '' ? false : true}>
					Submit
				</button>
			</div>
		)
	}
}
