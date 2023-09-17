import { Component } from 'react'
import Api from '../../api/axios'
import { LoadsURL } from '../../api/config'
import { ViewLoad } from './viewLoad'
import { Loader } from '../loader'

import { ListOfTrailerTypes } from '../../data/trailers'

export class LoadList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loads: [],
			selectedLoad: {},
			show: false,
			loading: false,
			searchQuery: '',
		}
	}

	componentDidMount = async () => {
		this.setState({ loading: true })
		const res = await Api.get(`${LoadsURL}/available`)
		this.setState({
			loads: res.data.map((load) => {
				return {
					...load,
					parsedPickupDetails: JSON.parse(load.pickupDetails),
					parsedPickupLocation: JSON.parse(load.pickupLocation),
					parsedDeliveryDetails: JSON.parse(load.deliveryDetails),
					parsedLoadInformation: JSON.parse(load.loadInformation),
				}
			}),
			loading: false,
		})
	}

	handleToggle = (load = {}) => {
		this.setState((prevState) => ({ selectedLoad: load, show: !prevState.show }))
	}

	handleSearchChange = (e) => {
		this.setState({ searchQuery: e.target.value })
	}

	getTrailerTypeName = (type) => {
		const trailer = ListOfTrailerTypes.find((t) => t.type === type)
		return trailer ? trailer.name : '-'
	}

	filterLoads = () => {
		const { loads, searchQuery } = this.state
		const searchStr = searchQuery.toLowerCase()

		return loads.filter(({ parsedPickupDetails, parsedPickupLocation, parsedDeliveryDetails, parsedLoadInformation }) => {
			return (
				(parsedPickupDetails.loadNumber && parsedPickupDetails.loadNumber.includes(searchStr)) ||
				(parsedPickupLocation.city && parsedPickupLocation.city.toLowerCase().includes(searchStr)) ||
				(parsedPickupLocation.state && parsedPickupLocation.state.toLowerCase().includes(searchStr)) ||
				(parsedDeliveryDetails.address.city && parsedDeliveryDetails.address.city.toLowerCase().includes(searchStr)) ||
				(parsedDeliveryDetails.address.state && parsedDeliveryDetails.address.state.toLowerCase().includes(searchStr)) ||
				(parsedLoadInformation.trailerType && parsedLoadInformation.trailerType.toLowerCase().includes(searchStr)) ||
				(parsedLoadInformation.hazmat && parsedLoadInformation.hazmat.toLowerCase().includes(searchStr)) ||
				(parsedLoadInformation.miles && parsedLoadInformation.miles.toLowerCase().includes(searchStr))
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
								<th>Load #</th>
								<th>Shipper </th>
								<th>Consignee </th>
								<th>Hazmat</th>
								<th>Trailer Type</th>
								<th>Miles & Total</th>
							</tr>
						</thead>
						<tbody>
							{this.filterLoads().map((load) => (
								<tr key={load.id} onClick={() => this.handleToggle(load)} className='hoverable'>
									<td>{load.parsedPickupDetails.loadNumber || '-'}</td>
									<td>
										{load.parsedPickupLocation.city}, {load.parsedPickupLocation.state}
									</td>
									<td>
										{load.parsedDeliveryDetails.address.city}, {load.parsedDeliveryDetails.address.state}
									</td>
									<td>{load.parsedLoadInformation.hazmat === 'false' ? 'No' : 'Yes'}</td>
									<td>{this.getTrailerTypeName(load.parsedLoadInformation.trailerType)}</td>
									<td>
										{load.parsedLoadInformation.miles} ${load.parsedLoadInformation.miles * load.parsedLoadInformation.rate}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{account?.id && selectedLoad.id ? (
						<ViewLoad selectedLoad={selectedLoad} close={() => this.handleToggle()} show={show} account={account} />
					) : null}
				</div>
			</div>
		)
	}
}
