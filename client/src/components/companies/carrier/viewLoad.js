import { Component } from 'react'
import { Modal, Card } from 'react-bootstrap'

import '../../../style/viewLoad.css'

export class ViewLoad extends Component {
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
		const selectedLoad = await this.props.selectedLoad
		if (selectedLoad !== {}) {
			const pLI = JSON.parse(selectedLoad.loadInformation)
			const pPL = JSON.parse(selectedLoad.pickupLocation)
			const pPD = JSON.parse(selectedLoad.pickupDetails)
			const pDD = JSON.parse(selectedLoad.deliveryDetails)
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
				available: selectedLoad.available,
			})
		}
	}

	render() {
		const { ...values } = this.state
		const { show, close } = this.props
		return (
			<Modal show={show} onHide={close} fullscreen className='loadModal'>
				<Modal.Header closeButton>
					<Modal.Title>Viewing Load : {this.props.selectedLoad.loadNumber}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='loadModalWrapper'>
						<Card className='loadCard'>
							<Card.Header>Load Information</Card.Header>
							<Card.Body>
								<div>
									<label htmlFor='productType'>Product Type: </label>
									<span id='productType'>{values.productType}</span>
								</div>
								<div>
									<label htmlFor='productWeight'>Product Weight: </label>
									<span id='productWeight'>{values.productWeight} lbs</span>
								</div>
								<div>
									<label htmlFor='hazmat'>Hazmat: </label>
									<span id='hazmat'>{values.hazmat === 'false' ? 'No' : 'Yes'}</span>
								</div>
								<div>
									<label htmlFor='trailerType'>Trailer Type: </label>
									<span id='trailerType'>{values.trailerType}</span>
								</div>
								<div>
									<label htmlFor='rate'>Rate: </label>
									<span id='rate'>{values.rate}</span>
								</div>
								<div>
									<label htmlFor='miles'>Miles: </label>
									<span id='miles'>{values.miles}</span>
								</div>
								<div>
									<label htmlFor='securements'>Required Securements: </label>
									<span id='securements'>{values.securements}</span>
								</div>
								<div>
									<label htmlFor='requiredPictures'>Securement Pictures Required: </label>
									<span id='requiredPictures'>{values.requiredPictures === 'true' ? 'Yes' : 'No'}</span>
								</div>
								<div>
									<label htmlFor='available'>Is Load Available Now: </label>
									<span id='available'>{values.available === 'true' ? 'Yes' : 'No'}</span>
								</div>
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
								<div>
									<label htmlFor='pickupDate'>Pick-up Date: </label>
									<span id='pickupDate'>{values.pickupDate}</span>
								</div>
								<div>
									<label htmlFor='pickupTime'>Pick-up Time: </label>
									<span id='pickupTime'>{values.pickupTime}</span>
								</div>
							</Card.Body>
						</Card>
						<Card className='loadCard'>
							<Card.Header>Delivery Location</Card.Header>
							<Card.Body>
								<div>
									<label htmlFor='companyName'>Company Name: </label>
									<span id='companyName'>{values.companyName}</span>
								</div>
								<div>
									<label htmlFor='companyStreet'>Street: </label>
									<span id='companyStreet'>{values.companyStreet}</span>
								</div>
								<div>
									<label htmlFor='companySuite'>Building Number: </label>
									<span id='companySuite'>{values.companySuite}</span>
								</div>
								<div>
									<label htmlFor='companyPostal'>Zip Code: </label>
									<span id='companyPostal'>{values.companyPostal}</span>
								</div>
								<div>
									<label htmlFor='companyCity'>City: </label>
									<span id='companyCity'>{values.companyCity}</span>
								</div>
								<div>
									<label htmlFor='companyState'>State: </label>
									<span id='companyState'>{values.companyState}</span>
								</div>
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
								<div>
									<label htmlFor='deliveryDate'>Delivery Date: </label>
									<span id='deliveryDate'>{values.deliveryDate}</span>
								</div>
								<div>
									<label htmlFor='deliveryTime'>Delivery Time: </label>
									<span id='deliveryTime'>{values.deliveryTime}</span>
								</div>
							</Card.Body>
						</Card>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button>Arrived At Shipper</button>
					<button>Departed From Shipper</button>
					<button>Arrived At Consignee</button>
					<button>Deliverd From Consignee</button>
				</Modal.Footer>
			</Modal>
		)
	}
}
