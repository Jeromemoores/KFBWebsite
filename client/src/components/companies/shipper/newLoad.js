import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { ErrorToast, SuccessfullToast } from '../../alerts/toasts'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

import { LoadSchema } from '../../../schemas/newLoadSchema'
import { StepOne, StepTwo, StepThree, StepFour } from './newLoadSteps'

import '../../../style/loads.css'

export class NewLoad extends Component {
	constructor(props) {
		super(props)
		this.state = {
			productWeight: '',
			productType: '',
			trailerType: [],
			hazmat: '',
			pickupTimeStart: '',
			pickupTimeEnd: '',
			pickupDateStart: '',
			pickupDateEnd: '',
			securements: '',
			requiredPictures: '',
			miles: '',
			rate: '',
			loadNumber: '',
			directions: '',
			comments: '',

			companyName: '',
			companyStreet: '',
			companySuite: '',
			companyCity: '',
			companyPostal: '',
			companyState: '',
			deliveryTimeStart: '',
			deliveryTimeEnd: '',
			deliveryDateStart: '',
			deliveryDateEnd: '',
			companyDirections: '',
			companyComments: '',
			available: '',
			step: 1,
		}
		this.handleFormikSubmit = this.handleFormikSubmit.bind(this)
	}
	changeStep = (direction, e, formikProps) => {
		e.preventDefault()
		const newStep = direction === 'f' ? formikProps.values.step + 1 : formikProps.values.step - 1
		formikProps.setFieldValue('step', newStep)
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}
	handleTrailerChange = (e, formikProps) => {
		const options = e.target.options
		const values = []
		for (let i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				values.push(options[i].value)
			}
		}
		formikProps.setFieldValue(e.target.name, values)
	}
	handleFormikSubmit = async (values) => {
		const newLoad = {
			loadInformation: {
				productType: values.productType,
				productWeight: values.productWeight,
				hazmat: values.hazmat,
				rate: values.rate,
				miles: values.miles,
				securements: values.securements,
				requiredPictures: values.requiredPictures,
				trailerType: values.trailerType,
			},
			pickupDetails: {
				loadNumber: values.loadNumber,
				directions: values.directions,
				comments: values.comments,
				time: `${values.pickupTimeStart} - ${values.pickupTimeEnd}`,
				date: `${values.pickupDateStart} - ${values.pickupDateEnd}`,
			},
			deliveryDetails: {
				name: values.companyName,
				address: {
					street: values.companyStreet,
					suite: values.companySuite,
					city: values.companyCity,
					state: values.companyState,
					postal: values.companyPostal,
				},
				time: `${values.deliveryTimeStart} - ${values.deliveryTimeEnd}`,
				date: `${values.deliveryDateStart} - ${values.deliveryDateEnd}`,
				directions: values.companyDirections,
				comments: values.companyComments,
			},
			available: values.available,
		}
		try {
			const res = await Api.post(`${LoadsURL}/create/${sessionStorage.getItem('token')}`, newLoad)
			if (res.status === 200) {
				SuccessfullToast('Load was created sucessfully... Refreshing Page')
				setTimeout(() => {
					window.location.href = '/shipper/home'
				}, 2200)
			} else {
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			ErrorToast(`Something went wrong: ${error}`)
		}
	}
	renderStep = (formikProps, handleTrailerChange) => {
		const StepComponents = [StepOne, StepTwo, StepThree, StepFour]
		return (
			<div className='load-form-wrapper'>
				{React.createElement(StepComponents[formikProps.values.step - 1], { handleTrailerChange, ...formikProps })}
				{formikProps.values.step > 1 && (
					<button type='button' onClick={(e) => this.changeStep('b', e, formikProps)} id='prev'>
						Previous
					</button>
				)}
				{formikProps.values.step < 4 ? (
					<button type='button' onClick={(e) => this.changeStep('f', e, formikProps)} id='next'>
						Next
					</button>
				) : (
					<button type='submit' id='submit' disabled={!formikProps.isValid || !formikProps.dirty}>
						Submit
					</button>
				)}
			</div>
		)
	}
	render() {
		return (
			<Formik initialValues={this.state} validationSchema={LoadSchema} onSubmit={this.handleFormikSubmit}>
				{(formikProps) => <Form>{this.renderStep(formikProps, this.handleTrailerChange)}</Form>}
			</Formik>
		)
	}
}
