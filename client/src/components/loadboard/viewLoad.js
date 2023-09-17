import { Component } from 'react'
import { Modal, Card, Badge } from 'react-bootstrap'

import Api from '../../api/axios'
import { LoadsURL } from '../../api/config'

import { ListOfTrailerTypes } from '../../data/trailers'

import '../../style/loads.css'

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
			loadLog: [],
			loadStatus: '',
			paid: {},
		}
	}
	async componentDidMount() {
		const selectedLoad = await this.props.selectedLoad
		if (selectedLoad != {}) {
			const pLI = JSON.parse(selectedLoad.loadInformation)
			const pPL = JSON.parse(selectedLoad.pickupLocation)
			const pPD = JSON.parse(selectedLoad.pickupDetails)
			const pDD = JSON.parse(selectedLoad.deliveryDetails)
			const pP = JSON.parse(selectedLoad.paid)
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
				loadLog: JSON.parse(selectedLoad.loadLog),
				loadStatus: selectedLoad.loadStatus,
				paid: {
					broker: pP.broker,
					carrier: pP.carrier,
				},
			})
		}
	}

	handleUpdateStatus = async (status, claimerStatus) => {
		const update = {
			loadStatus: status,
			claimerStatus: claimerStatus,
		}
		try {
			const res = await Api.put(`${LoadsURL}/updateStatus/${this.props.selectedLoad.loadNumber}/${sessionStorage.getItem('token')}`, update)
			if (res.status === 200) {
				window.location.reload()
			}
		} catch (error) {
			console.log(error)
		}
	}

	handleClaim = async (loadId) => {
		try {
			const res = await Api.put(`${LoadsURL}/claim/${loadId}/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				window.location.href = '/loadboard'
			}
		} catch (error) {
			console.log(error)
		}
	}

	handleUnclaim = async () => {
		try {
			const res = await Api.put(`${LoadsURL}/unclaim/${this.props.selectedLoad.loadNumber}/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				window.location.reload()
			} else {
				console.log(res)
			}
		} catch (error) {
			console.log(error)
		}
	}
	getTrailerNames = (type) => {
		const trailer = ListOfTrailerTypes.find((t) => t.type === type)
		return trailer ? trailer.name : ' - '
	}

	render() {
		const { ...values } = this.state
		const { show, close, account, selectedLoad } = this.props
		return (
			<Modal show={show} onHide={close} fullscreen className='load-modal-edit'>
				<Modal.Header closeButton>
					<Modal.Title>Viewing Load : {selectedLoad.loadNumber}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='load-modal-wrapper'>
						<Card className='load-card'>
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
						<Card className='load-card'>
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
									<span id='trailerType'>{this.getTrailerNames(values.trailerType)}</span>
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
								<div>
									<label htmlFor='loadStatus'>Load Status: </label>
									<span id='loadStatus'>
										{values.loadStatus === 'loading' && <Badge bg='primary'>Loading</Badge>}
										{values.loadStatus === 'departed' && <Badge bg='info'>In Transit</Badge>}
										{values.loadStatus === 'unloading' && <Badge bg='warning'>Unloading</Badge>}
										{values.loadStatus === 'completed' && <Badge bg='success'>Completed</Badge>}
									</span>
								</div>
							</Card.Body>
						</Card>
						<Card className='load-card'>
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
						<Card className='load-card'>
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
						<Card className='load-card'>
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
						{account?.company === selectedLoad.companyId ? (
							<Card className='load-card-log overflow'>
								<Card.Header>Load Log</Card.Header>
								<Card.Body>
									{values.loadLog.map((log) => {
										return (
											<div key={log.id}>
												<label htmlFor={log.event}>Event: </label>
												<span id={log.event}>
													{log.event} by {log.account.email} at {log.date}
												</span>
											</div>
										)
									})}
								</Card.Body>
							</Card>
						) : (
							<></>
						)}
						{account?.company == selectedLoad.claimedBy && selectedLoad.loadStatus === 'completed' ? (
							<Card className='load-card'>
								<Card.Header>Payment Status</Card.Header>
								<Card.Body>
									<div>
										<label htmlFor='paidBroker'>Paid KFB: </label>
										<span id='paidBroker'>
											{values.paid.broker === false ? (
												<Badge bg='warning' text='dark'>
													No
												</Badge>
											) : (
												<Badge bg='success' text='dark'>
													Yes
												</Badge>
											)}
										</span>
									</div>
									<div>
										<label htmlFor='paidCarrier'>Paid Carrier: </label>
										<span id='paidCarrier'>
											{values.paid.carrier === false ? (
												<Badge bg='warning' text='dark'>
													No
												</Badge>
											) : (
												<Badge bg='success' text='dark'>
													Yes
												</Badge>
											)}
										</span>
									</div>
								</Card.Body>
							</Card>
						) : (
							<></>
						)}
					</div>
				</Modal.Body>
				{account?.company == selectedLoad.claimedBy && selectedLoad.loadStatus !== 'completed' ? (
					<div className='load-status-buttons-wrapper'>
						<button onClick={() => this.handleUpdateStatus('deadHead', 'In transit to Shipper')}>In Transit To Shipper</button>
						<button onClick={() => this.handleUpdateStatus('loading', 'At Shipper')}>Arrived At Shipper</button>
						<button onClick={() => this.handleUpdateStatus('departed', 'In transit to Consignee')}>Departed From Shipper</button>
						<button onClick={() => this.handleUpdateStatus('unloading', 'At Consignee')}>Arrived At Consignee</button>
						<button onClick={() => this.handleUpdateStatus('completed', 'Unloaded')}>Departed From Consignee</button>
						<button className='red' onClick={this.handleUnclaim}>
							Unclaim this load
						</button>
					</div>
				) : (
					<></>
				)}
				{account?.companyType != null && account?.company != selectedLoad.claimedBy && account?.companyType !== 'shipper' ? (
					<Modal.Footer>
						<button onClick={() => this.handleClaim(selectedLoad.loadNumber)}>Claim Load</button>
					</Modal.Footer>
				) : (
					<></>
				)}
			</Modal>
		)
	}
}
