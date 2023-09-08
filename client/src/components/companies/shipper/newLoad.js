import { Component } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { AddressAutofill } from '@mapbox/search-js-react'

import { ListOfTrailerTypes } from '../../../data/trailers'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

import '../../../style/loadStyling.css'

export class NewLoad extends Component {
	constructor(props) {
		super(props)
		this.state = {
			productWeight: '',
			productType: '',
			trailerType: {},
			hazmat: null,
			pickupTime: '', // Change to optional range
			pickupDate: '', // Change to optional range
			securements: '',
			requiredPictures: null,
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
			deliveryTime: '', // change to optional range
			deliveryDate: '', // change to optional range
			companyDirections: '',
			companyComments: '',
			available: false,
		}
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { ...values } = this.state
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
				time: values.pickupTime,
				date: values.pickupDate,
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
				time: values.deliveryTime,
				date: values.deliveryDate,
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
	render() {
		const { ...values } = this.state
		return (
			<Form>
				<div className='loadWrapper'>
					<h5>Load Information</h5>
					<hr />
					<div className='loadInformation'>
						<FloatingLabel label='Product Type'>
							<Form.Control
								type='text'
								name='productType'
								value={values.productType}
								onChange={this.handleChange('productType')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Product Weight'>
							<Form.Control
								type='text'
								name='productWeight'
								value={values.productWeight}
								onChange={this.handleChange('productWeight')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Hazmat'>
							<Form.Select onChange={this.handleChange('hazmat')} name='hazmat'>
								<option>-</option>
								<option value='false'>No</option>
								<option value='true'>Yes</option>
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel label='Trailer Type'>
							<Form.Select onChange={this.handleChange('trailerType')} name='trailerType'>
								{ListOfTrailerTypes.map((trailer) => {
									return (
										<option value={trailer.type} key={trailer.id}>
											{trailer.name}
										</option>
									)
								})}
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel label='Rate'>
							<Form.Control
								type='number'
								name='rate'
								value={values.rate}
								onChange={this.handleChange('rate')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Miles'>
							<Form.Control
								type='number'
								name='miles'
								value={values.miles}
								onChange={this.handleChange('miles')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Required Securements'>
							<Form.Control
								type='text'
								name='securements'
								value={values.securements}
								onChange={this.handleChange('securements')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Securement Picutres Required'>
							<Form.Select onChange={this.handleChange('requiredPictures')} name='requiredPictures'>
								<option>-</option>
								<option value='false'>No</option>
								<option value='true'>Yes</option>
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel label='Is Load Available Now'>
							<Form.Select onChange={this.handleChange('available')} name='available'>
								<option>-</option>
								<option value='false'>No</option>
								<option value='true'>Yes</option>
							</Form.Select>
						</FloatingLabel>
					</div>
					<h5>Pickup Details</h5>
					<hr />
					<div className='pickupDetails'>
						<FloatingLabel label='Load Number'>
							<Form.Control
								type='text'
								name='loadNumber'
								value={values.loadNumber}
								onChange={this.handleChange('loadNumber')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Directions'>
							<Form.Control
								type='text'
								as='textarea'
								name='directions'
								value={values.directions}
								onChange={this.handleChange('directions')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Comments'>
							<Form.Control
								type='text'
								as='textarea'
								name='comments'
								value={values.comments}
								onChange={this.handleChange('comments')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Pick-up Date'>
							<Form.Control
								type='date'
								name='pickupDate'
								value={values.pickupDate}
								onChange={this.handleChange('pickupDate')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Pick-up Time'>
							<Form.Control
								type='time'
								name='pickupTime'
								value={values.pickupTime}
								onChange={this.handleChange('pickupTime')}
								placeholder=''
							/>
						</FloatingLabel>
					</div>
					<h5>Delivery Location</h5>
					<hr />
					<div className='deliveryLocation'>
						<FloatingLabel label='Company Name'>
							<Form.Control
								type='text'
								name='companyName'
								value={values.companyName}
								onChange={this.handleChange('companyName')}
								placeholder=''
							/>
						</FloatingLabel>
						<AddressAutofill accessToken='pk.eyJ1IjoiaGV5aXRzbWVqIiwiYSI6ImNsZWNrZTBnMzAwNnczb3FvaTJyNHZ0cmkifQ.ggiC-ULgV-LGObqZzLuW2g'>
							<FloatingLabel label='Street'>
								<Form.Control
									type='text'
									name='companyStreet'
									value={values.companyStreet}
									onChange={this.handleChange('companyStreet')}
									placeholder=''
									autoComplete='address-line1'
								/>
							</FloatingLabel>
						</AddressAutofill>
						<FloatingLabel label='Building Number'>
							<Form.Control
								type='text'
								name='companySuite'
								value={values.companySuite}
								onChange={this.handleChange('companySuite')}
								placeholder=''
								autoComplete='address-line2'
							/>
						</FloatingLabel>
						<FloatingLabel label='Zip Code'>
							<Form.Control
								type='text'
								name='companyPostal'
								value={values.companyPostal}
								onChange={this.handleChange('companyPostal')}
								placeholder=''
								autoComplete='postal-code'
							/>
						</FloatingLabel>
						<FloatingLabel label='City'>
							<Form.Control
								type='text'
								name='companyCity'
								value={values.companyCity}
								onChange={this.handleChange('companyCity')}
								placeholder=''
								autoComplete='address-level2'
							/>
						</FloatingLabel>
						<FloatingLabel label='State'>
							<Form.Control
								type='text'
								name='companyState'
								value={values.companyState}
								onChange={this.handleChange('companyState')}
								placeholder=''
								autoComplete='address-level1'
							/>
						</FloatingLabel>
						<input disabled className='invis' />
						<input disabled className='invis' />
					</div>
					<h5>Delivery Details</h5>
					<hr />
					<div className='deliveryDetails'>
						<FloatingLabel label='Directions'>
							<Form.Control
								type='text'
								as='textarea'
								name='companyDirections'
								value={values.companyDirections}
								onChange={this.handleChange('companyDirections')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Comments'>
							<Form.Control
								type='text'
								as='textarea'
								name='companyComments'
								value={values.companyComments}
								onChange={this.handleChange('companyComments')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Delivery Date'>
							<Form.Control
								type='date'
								name='deliveryDate'
								value={values.deliveryDate}
								onChange={this.handleChange('deliveryDate')}
								placeholder=''
							/>
						</FloatingLabel>
						<FloatingLabel label='Delivery Time'>
							<Form.Control
								type='time'
								name='deliveryTime'
								value={values.deliveryTime}
								onChange={this.handleChange('deliveryTime')}
								placeholder=''
							/>
						</FloatingLabel>
					</div>
					<hr />
					<div className='buttonWrapper'>
						<button onClick={this.handleSubmit}>Post the load</button>
					</div>
				</div>
			</Form>
		)
	}
}
