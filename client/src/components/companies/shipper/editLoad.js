import { Component } from 'react'
import { FloatingLabel, Form, Modal, Card } from 'react-bootstrap'
import { AddressAutofill } from '@mapbox/search-js-react'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

export class EditLoad extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			street: '',
			suite: '',
			city: '',
			state: '',
			postal: '',
			productWeight: '',
			productType: '',
			trailerType: '',
			hazmat: '',
			pickupTime: '', // Change to optional range
			pickupDate: '', // Change to optional range
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
			deliveryTime: '', // change to optional range
			deliveryDate: '', // change to optional range
			companyDirections: '',
			companyComments: '',
			available: '',
		}
	}
	async componentDidMount() {
		const editLoad = await this.props.editLoad
		if (editLoad != null) {
			const pLI = JSON.parse(editLoad.loadInformation)
			const pPL = JSON.parse(editLoad.pickupLocation)
			const pPD = JSON.parse(editLoad.pickupDetails)
			const pDD = JSON.parse(editLoad.deliveryDetails)
			const pDDS = pDD.address.state
			this.setState({
				name: pPL.name ? pPL.name : '',
				street: pPL.street,
				suite: pPL.suite,
				city: pPL.city,
				state: pPL.state,
				postal: pPL.postal,

				productWeight: pLI.productWeight,
				productType: pLI.productType,
				trailerType: pLI.trailerType,
				hazmat: pLI.hazmat,
				pickupTime: pPD.time, // Change to optional range
				pickupDate: pPD.date, // Change to optional range
				securements: pLI.securements,
				requiredPictures: pLI.requiredPictures,
				miles: pLI.miles,
				rate: pLI.rate,
				loadNumber: pPD.loadNumber,
				directions: pPD.directions,
				comments: pPD.comments,

				companyName: pDD.name,
				companyStreet: pDD.address.street,
				companySuite: pDD.address.suite,
				companyCity: pDD.address.city,
				companyPostal: pDD.address.postal,
				companyState: pDDS,
				deliveryTime: pPD.time, // change to optional range
				deliveryDate: pPD.date, // change to optional range
				companyDirections: pPD.directions,
				companyComments: pPD.comments,
				available: editLoad.available,
			})
		}
	}
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.currentTarget.value })
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { editLoad } = this.props
		const { ...values } = this.state
		const updatedLoad = {
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
			pickupLocation: {
				name: values.name,
				street: values.street,
				suite: values.suite,
				city: values.city,
				state: values.state,
				postal: values.postal,
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
			const res = await Api.put(
				`${LoadsURL}/update/${editLoad.loadNumber}/${sessionStorage.getItem('token')}`,
				updatedLoad
			)
			console.log(res)
			if (res.status === 200) {
				window.location.href = '/shipper/home'
			}
		} catch (error) {
			console.log(`Something went wrong ${error}`)
		}
	}
	render() {
		const { ...values } = this.state
		const { setShow, setClose, editLoad } = this.props
		return (
			<Modal show={setShow} onHide={setClose} fullscreen>
				<Modal.Header closeButton>
					<Modal.Title>Editing Load : {editLoad.loadNumber} </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='loadModalWrapper'>
						<Card className='loadCard'>
							<Card.Header>Pickup Location</Card.Header>
							<Card.Body>
								<div>
									<label htmlFor='name'>Company Name: </label>
									<span id='name'>{values.name}</span>
								</div>
								<div>
									<label htmlFor='street'>Street: </label>
									<span id='street'>{values.street}</span>
								</div>
								<div>
									<label htmlFor='street'>Building Number: </label>
									<span id='suite'>{values.suite}</span>
								</div>
								<div>
									<label htmlFor='city'>City: </label>
									<span id='city'>{values.city}</span>
								</div>
								<div>
									<label htmlFor='state'>State: </label>
									<span id='state'>{values.state}</span>
								</div>
								<div>
									<label htmlFor='postal'>Postal: </label>
									<span id='postal'>{values.postal}</span>
								</div>
							</Card.Body>
						</Card>
						<Card className='loadCard'>
							<Card.Header>Load Information</Card.Header>
							<Card.Body>
								<FloatingLabel label='Product Type'>
									<Form.Control
										type='text'
										name='productType'
										value={values.productType}
										onChange={this.handleChange('productType')}
										placeholder={values.productType}
									/>
								</FloatingLabel>
								<FloatingLabel label='Product Weight'>
									<Form.Control
										type='text'
										name='productWeight'
										value={values.productWeight}
										onChange={this.handleChange('productWeight')}
										placeholder={values.productWeight}
									/>
								</FloatingLabel>
								<div>
									<label htmlFor='hazmat'>Hazmat: </label>
									<span id='hazmat'>{values.hazmat === 'false' ? 'No' : 'Yes'}</span>
								</div>
								<div>
									<label htmlFor='trailerType'>Trailer Type: </label>
									<span id='trailerType'>{values.trailerType}</span>
								</div>
								<FloatingLabel label='Rate'>
									<Form.Control
										type='number'
										name='rate'
										value={values.rate}
										onChange={this.handleChange('rate')}
										placeholder={values.rate}
									/>
								</FloatingLabel>
								<FloatingLabel label='Miles'>
									<Form.Control
										type='number'
										name='miles'
										value={values.miles}
										onChange={this.handleChange('miles')}
										placeholder={values.miles}
									/>
								</FloatingLabel>
								<div>
									<label htmlFor='securements'>Required Securements: </label>
									<span id='securements'>{values.securements}</span>
								</div>
								<div>
									<label htmlFor='requiredPictures'>Securement Pictures Required: </label>
									<span id='requiredPictures'>{values.requiredPictures === 'true' ? 'Yes' : 'No'}</span>
								</div>
								<FloatingLabel label='Is Load Available Now'>
									<Form.Select onChange={this.handleChange('available')} name='available'>
										<option value={values.available}>{values.available === 'true' ? 'Yes' : 'No'}</option>
										<option value='false'>No</option>
										<option value='true'>Yes</option>
									</Form.Select>
								</FloatingLabel>
							</Card.Body>
						</Card>
						<Card className='loadCard'>
							<Card.Header>Pickup Details</Card.Header>
							<Card.Body>
								<div>
									<label htmlFor='loadNumber'>Load Number: </label>
									<span id='loadNumber'>{values.loadNumber}</span>
								</div>
								<div>
									<label htmlFor='directions'>Directions: </label>
									<span id='directions'>{values.directions}</span>
								</div>
								<div>
									<label htmlFor='comments'>Comments: </label>
									<span id='comments'>{values.comments}</span>
								</div>
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
							</Card.Body>
						</Card>
						<Card className='loadCard'>
							<Card.Header>Delivery Location</Card.Header>
							<Card.Body>
								<FloatingLabel label='Company Name'>
									<Form.Control
										type='text'
										name='companyName'
										value={values.companyName}
										onChange={this.handleChange('companyName')}
										placeholder={values.companyName}
									/>
								</FloatingLabel>
								<AddressAutofill accessToken='pk.eyJ1IjoiaGV5aXRzbWVqIiwiYSI6ImNsZWNrZTBnMzAwNnczb3FvaTJyNHZ0cmkifQ.ggiC-ULgV-LGObqZzLuW2g'>
									<FloatingLabel label='Street'>
										<Form.Control
											type='text'
											name='companyStreet'
											value={values.companyStreet}
											onChange={this.handleChange('companyStreet')}
											placeholder={values.companyStreet}
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
										placeholder={values.companySuite}
										autoComplete='address-line2'
									/>
								</FloatingLabel>
								<FloatingLabel label='Zip Code'>
									<Form.Control
										type='text'
										name='companyPostal'
										value={values.companyPostal}
										onChange={this.handleChange('companyPostal')}
										placeholder={values.companyPostal}
										autoComplete='postal-code'
									/>
								</FloatingLabel>
								<FloatingLabel label='City'>
									<Form.Control
										type='text'
										name='companyCity'
										value={values.companyCity}
										onChange={this.handleChange('companyCity')}
										placeholder={values.companyCity}
										autoComplete='address-level2'
									/>
								</FloatingLabel>
								<FloatingLabel label='State'>
									<Form.Control
										type='text'
										name='companyState'
										value={values.companyState}
										onChange={this.handleChange('companyState')}
										placeholder={values.companyState}
										autoComplete='address-level1'
									/>
								</FloatingLabel>
							</Card.Body>
						</Card>
						<Card className='loadCard'>
							<Card.Header>Delivery Details</Card.Header>
							<Card.Body>
								<div>
									<label htmlFor='companyDirections'>Directions: </label>
									<span id='companyDirections'>{values.companyDirections}</span>
								</div>
								<div>
									<label htmlFor='companyComments'>Comments: </label>
									<span id='companyComments'>{values.companyComments}</span>
								</div>
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
							</Card.Body>
						</Card>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={this.handleSubmit}>Save Update</button>
				</Modal.Footer>
			</Modal>
		)
	}
}
