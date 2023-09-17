import { Component } from 'react'
import { TrashFill } from 'react-bootstrap-icons'
import { Loader } from '../loader'

import { KFBViewLoad } from './viewLoad'

import { ListOfTrailerTypes } from '../../data/trailers'
import Api from '../../api/axios'
import { DATAURL } from '../../api/config'

export class KFBLoadList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loads: [],
			searchQuery: '',
			loading: false,
		}
	}
	componentDidMount = async () => {
		this.setState({ loading: true })
		const res = await Api.get(`${DATAURL}/allLoads/${sessionStorage.getItem('token')}`)
		this.setState({
			loads: res.data.map((load) => {
				return {
					...load,
					parsedPickupDetails: JSON.parse(load.pickupDetails),
					parsedPickupLocation: JSON.parse(load.pickupLocation),
					parsedDeliveryDetails: JSON.parse(load.deliveryDetails),
					parsedLoadInformation: JSON.parse(load.loadInformation),
					parsedPaidInformation: JSON.parse(load.paid),
				}
			}),
			loading: false,
		})
	}
	handleSearchChange = (e) => {
		this.setState({ searchQuery: e.target.value })
	}
	handleToggle = (load = {}) => {
		this.setState((prevState) => ({ selectedLoad: load, show: !prevState.show }))
	}
	getTrailerTypeName = (type) => {
		const trailer = ListOfTrailerTypes.find((t) => t.type === type)
		return trailer ? trailer.name : '-'
	}
	filterLoads = () => {
		const { loads, searchQuery } = this.state
		const searchStr = searchQuery.toLowerCase()

		return loads.filter((load) => {
			const { parsedPickupDetails, parsedPickupLocation, parsedDeliveryDetails, parsedLoadInformation } = load

			return (
				(parsedPickupDetails.loadNumber && parsedPickupDetails.loadNumber.includes(searchStr)) ||
				(parsedPickupLocation.city && parsedPickupLocation.city.toLowerCase().includes(searchStr)) ||
				(parsedPickupLocation.state && parsedPickupLocation.state.toLowerCase().includes(searchStr)) ||
				(parsedDeliveryDetails.address.city && parsedDeliveryDetails.address.city.toLowerCase().includes(searchStr)) ||
				(parsedDeliveryDetails.address.state && parsedDeliveryDetails.address.state.toLowerCase().includes(searchStr)) ||
				(parsedLoadInformation.trailerType && parsedLoadInformation.trailerType.toLowerCase().includes(searchStr)) ||
				(parsedLoadInformation.hazmat && parsedLoadInformation.hazmat.toLowerCase().includes(searchStr)) ||
				(load.loadNumber && load.loadNumber.toLowerCase().includes(searchStr)) ||
				(load.trackingNumber && load.trackingNumber.toLowerCase().includes(searchStr))
			)
		})
	}
	render() {
		const { loading, searchQuery, selectedLoad, show } = this.state
		const { account } = this.props
		if (loading) return <Loader message={'Loading Load list...'} />
		return (
			<div className='kfb-default-table-page-wrapper'>
				<div className='kfb-default-table-search-input'>
					<input type='text' placeholder='Search...' value={searchQuery} onChange={this.handleSearchChange} />
				</div>
				<div className='kfb-default-table-wrapper' style={{ margin: '2%' }}>
					<table className='kfb-default-table hoverable'>
						<thead>
							<tr>
								<th>KFB #</th>
								<th>Company Id</th>
								<th>Load #</th>
								<th>Shipper</th>
								<th>Consignee</th>
								<th>Tracking Number</th>
								<th>Paid KFB</th>
								<th>Paid Carrier</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
							{this.filterLoads().map((load) => (
								<tr key={load.id} onClick={() => this.handleToggle(load)} className='hoverable'>
									<td>{load.loadNumber}</td>
									<td>{load.companyId}</td>
									<td>{load.parsedPickupDetails.loadNumber || '-'}</td>
									<td>{load.parsedPickupLocation.name}</td>
									<td>{load.parsedDeliveryDetails.name}</td>
									<td>{load.trackingNumber}</td>
									<td>{load.parsedPaidInformation.broker === false ? 'No' : 'Yes'}</td>
									<td>{load.parsedPaidInformation.carrier === false ? 'No' : 'Yes'}</td>
									<td className='td-buttons'>
										<button>
											<TrashFill />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{selectedLoad?.id ? <KFBViewLoad selectedLoad={selectedLoad} close={() => this.handleToggle()} show={show} account={account} /> : null}
				</div>
			</div>
		)
	}
}
