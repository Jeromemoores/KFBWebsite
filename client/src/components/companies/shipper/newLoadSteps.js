import { Component } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { AddressAutofill } from '@mapbox/search-js-react'

import { ListOfTrailerTypes } from '../../../data/trailers'

export class StepOne extends Component {
	render() {
		const { values, errors, touched, handleChange, handleBlur } = this.props
		return (
			<div className='step-input-wrapper'>
				<h3>Load Information</h3>
				<div className='step-input-sections'>
					<FloatingLabel label='Product Type' style={{ width: '48%' }}>
						<Form.Control type='text' name='productType' value={values.productType} onChange={handleChange} onBlur={handleBlur} placeholder='' />
						{errors.productType && touched.productType && <div className='text-danger'>{errors.productType}</div>}
					</FloatingLabel>
					<FloatingLabel label='Product Weight' style={{ width: '48%' }}>
						<Form.Control type='text' name='productWeight' value={values.productWeight} onChange={handleChange} onBlur={handleBlur} placeholder='' />
						{errors.productWeight && touched.productWeight && <div className='text-danger'>{errors.productWeight}</div>}
					</FloatingLabel>
				</div>
				<div className='step-input-sections'>
					<FloatingLabel label='Hazmat' style={{ width: '48%' }}>
						<Form.Select onChange={handleChange} onBlur={handleBlur} name='hazmat' value={values.hazmat}>
							<option>-</option>
							<option value='false'>No</option>
							<option value='true'>Yes</option>
						</Form.Select>
						{errors.hazmat && touched.hazmat && <div className='text-danger'>{errors.hazmat}</div>}
					</FloatingLabel>

					<FloatingLabel label='Trailer Type' style={{ width: '48%' }}>
						<Form.Select
							onChange={handleChange}
							name='trailerType'
							onBlur={handleBlur}
							value={values.trailerType}
							multiple
							style={{ height: '260px' }}
						>
							{ListOfTrailerTypes.map((trailer) => {
								return (
									<option value={trailer.type} key={trailer.id}>
										{trailer.name}
									</option>
								)
							})}
						</Form.Select>
						{errors.trailerType && touched.trailerType && <div className='text-danger'>{errors.trailerType}</div>}
					</FloatingLabel>
				</div>
				<div className='step-input-sections'>
					<FloatingLabel label='Rate' style={{ width: '48%' }}>
						<Form.Control type='number' name='rate' value={values.rate} onChange={handleChange} placeholder='' onBlur={handleBlur} />
						{errors.rate && touched.rate && <div className='text-danger'>{errors.rate}</div>}
					</FloatingLabel>
					<FloatingLabel label='Miles' style={{ width: '48%' }}>
						<Form.Control type='number' name='miles' value={values.miles} onChange={handleChange} placeholder='' onBlur={handleBlur} />
						{errors.miles && touched.miles && <div className='text-danger'>{errors.miles}</div>}
					</FloatingLabel>
				</div>
				<div className='step-input-sections'>
					<FloatingLabel label='Required Securements' style={{ width: '48%' }}>
						<Form.Control type='text' name='securements' value={values.securements} onChange={handleChange} onBlur={handleBlur} placeholder='' />
						{errors.securements && touched.securements && <div className='text-danger'>{errors.securements}</div>}
					</FloatingLabel>
					<FloatingLabel label='Securement Picutres Required' style={{ width: '48%' }}>
						<Form.Select onChange={handleChange} onBlur={handleBlur} name='requiredPictures' value={values.requiredPictures}>
							<option>-</option>
							<option value='false'>No</option>
							<option value='true'>Yes</option>
						</Form.Select>
						{errors.requiredPictures && touched.requiredPictures && <div className='text-danger'>{errors.requiredPictures}</div>}
					</FloatingLabel>
				</div>
				<FloatingLabel label='Is Load Available Now' style={{ width: '97%', margin: '0 auto' }}>
					<Form.Select onChange={handleChange} onBlur={handleBlur} name='available' value={values.available}>
						<option>-</option>
						<option value='false'>No</option>
						<option value='true'>Yes</option>
					</Form.Select>
					{errors.available && touched.available && <div className='text-danger'>{errors.available}</div>}
				</FloatingLabel>
			</div>
		)
	}
}

export class StepTwo extends Component {
	render() {
		const { values, errors, touched, handleChange, handleBlur } = this.props

		return (
			<div className='step-input-wrapper'>
				<h3>Pickup Details</h3>

				<FloatingLabel label='Load Number'>
					<Form.Control type='text' name='loadNumber' value={values.loadNumber} onChange={handleChange} placeholder='' onBlur={handleBlur} />
					{errors.loadNumber && touched.loadNumber && <div className='text-danger'>{errors.loadNumber}</div>}
				</FloatingLabel>
				<FloatingLabel label='Directions'>
					<Form.Control type='text' as='textarea' name='directions' value={values.directions} onChange={handleChange} placeholder='' />
				</FloatingLabel>
				<FloatingLabel label='Comments'>
					<Form.Control type='text' as='textarea' name='comments' value={values.comments} onChange={handleChange} placeholder='' />
				</FloatingLabel>
				<FloatingLabel label='Pick-up Date Start'>
					<Form.Control
						type='date'
						name='pickupDateStart'
						value={values.pickupDateStart}
						onChange={handleChange}
						placeholder=''
						onBlur={handleBlur}
					/>
					{errors.pickupDateStart && touched.pickupDateStart && <div className='text-danger'>{errors.pickupDateStart}</div>}
				</FloatingLabel>
				<FloatingLabel label='Pick-up Date End'>
					<Form.Control type='date' name='pickupDateEnd' value={values.pickupDateEnd} onChange={handleChange} placeholder='' onBlur={handleBlur} />
					{errors.pickupDateEnd && touched.pickupDateEnd && <div className='text-danger'>{errors.pickupDateEnd}</div>}
				</FloatingLabel>
				<FloatingLabel label='Pick-up Time Start'>
					<Form.Control
						type='time'
						name='pickupTimeStart'
						value={values.pickupTimeStart}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					{errors.pickupTimeStart && touched.pickupTimeStart && <div className='text-danger'>{errors.pickupTimeStart}</div>}
				</FloatingLabel>
				<FloatingLabel label='Pick-up Time End'>
					<Form.Control type='time' name='pickupTimeEnd' value={values.pickupTimeEnd} onChange={handleChange} onBlur={handleBlur} placeholder='' />
					{errors.pickupTimeEnd && touched.pickupTimeEnd && <div className='text-danger'>{errors.pickupTimeEnd}</div>}
				</FloatingLabel>
			</div>
		)
	}
}

export class StepThree extends Component {
	render() {
		const { values, errors, touched, handleChange, handleBlur } = this.props

		return (
			<div className='step-input-wrapper'>
				<h3>Delivery Location</h3>

				<FloatingLabel label='Company Name'>
					<Form.Control type='text' name='companyName' value={values.companyName} onChange={handleChange} onBlur={handleBlur} placeholder='' />
					{errors.companyName && touched.companyName && <div className='text-danger'>{errors.companyName}</div>}
				</FloatingLabel>
				<AddressAutofill accessToken='pk.eyJ1IjoiaGV5aXRzbWVqIiwiYSI6ImNsZWNrZTBnMzAwNnczb3FvaTJyNHZ0cmkifQ.ggiC-ULgV-LGObqZzLuW2g'>
					<FloatingLabel label='Street'>
						<Form.Control
							type='text'
							name='companyStreet'
							value={values.companyStreet}
							onChange={handleChange('companyStreet')}
							onBlur={handleBlur}
							placeholder=''
							autoComplete='address-line1'
						/>
						{errors.companyStreet && touched.companyStreet && <div className='text-danger'>{errors.companyStreet}</div>}
					</FloatingLabel>
				</AddressAutofill>
				<FloatingLabel label='Building Number'>
					<Form.Control
						type='text'
						name='companySuite'
						value={values.companySuite}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
						autoComplete='address-line2'
					/>
					{errors.companySuite && touched.companySuite && <div className='text-danger'>{errors.companySuite}</div>}
				</FloatingLabel>
				<FloatingLabel label='Zip Code'>
					<Form.Control
						type='text'
						name='companyPostal'
						value={values.companyPostal}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
						autoComplete='postal-code'
					/>
					{errors.companyPostal && touched.companyPostal && <div className='text-danger'>{errors.companyPostal}</div>}
				</FloatingLabel>
				<FloatingLabel label='City'>
					<Form.Control
						type='text'
						name='companyCity'
						value={values.companyCity}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
						autoComplete='address-level2'
					/>
					{errors.companyCity && touched.companyCity && <div className='text-danger'>{errors.companyCity}</div>}
				</FloatingLabel>
				<FloatingLabel label='State'>
					<Form.Control
						type='text'
						name='companyState'
						value={values.companyState}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
						autoComplete='address-level1'
					/>
					{errors.companyState && touched.companyState && <div className='text-danger'>{errors.companyState}</div>}
				</FloatingLabel>
			</div>
		)
	}
}

export class StepFour extends Component {
	render() {
		const { values, errors, touched, handleChange, handleBlur } = this.props

		return (
			<div className='step-input-wrapper'>
				<h3>Delivery Details</h3>

				<FloatingLabel label='Directions'>
					<Form.Control type='text' as='textarea' name='companyDirections' value={values.companyDirections} onChange={handleChange} placeholder='' />
				</FloatingLabel>
				<FloatingLabel label='Comments'>
					<Form.Control type='text' as='textarea' name='companyComments' value={values.companyComments} onChange={handleChange} placeholder='' />
				</FloatingLabel>
				<FloatingLabel label='Delivery Date Start'>
					<Form.Control
						type='date'
						name='deliveryDateStart'
						value={values.deliveryDateStart}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					{errors.deliveryDateStart && touched.deliveryDateStart && <div className='text-danger'>{errors.deliveryDateStart}</div>}
				</FloatingLabel>
				<FloatingLabel label='Delivery Date End'>
					<Form.Control
						type='date'
						name='deliveryDateEnd'
						value={values.deliveryDateEnd}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					{errors.deliveryDateEnd && touched.deliveryDateEnd && <div className='text-danger'>{errors.deliveryDateEnd}</div>}
				</FloatingLabel>
				<FloatingLabel label='Delivery Time Start'>
					<Form.Control
						type='time'
						name='deliveryTimeStart'
						value={values.deliveryTimeStart}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					{errors.deliveryTimeStart && touched.deliveryTimeStart && <div className='text-danger'>{errors.deliveryTimeStart}</div>}
				</FloatingLabel>
				<FloatingLabel label='Delivery Time End'>
					<Form.Control
						type='time'
						name='deliveryTimeEnd'
						value={values.deliveryTimeEnd}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder=''
					/>
					{errors.deliveryTimeEnd && touched.deliveryTimeEnd && <div className='text-danger'>{errors.deliveryTimeEnd}</div>}
				</FloatingLabel>
			</div>
		)
	}
}
