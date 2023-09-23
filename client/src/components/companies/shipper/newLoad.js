import React, { Component } from 'react'
import { Formik, Form } from 'formik'

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
			trailerType: {},
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
				window.location.href = '/shipper/home'
			}
		} catch (error) {
			console.log(`Something went wrong ${error}`)
		}
	}
	renderStep = (formikProps) => {
		const StepComponents = [StepOne, StepTwo, StepThree, StepFour]
		return (
			<div className='load-form-wrapper'>
				{React.createElement(StepComponents[formikProps.values.step - 1], { ...formikProps })}
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
				{(formikProps) => <Form>{this.renderStep(formikProps)}</Form>}
			</Formik>
		)
	}
}
