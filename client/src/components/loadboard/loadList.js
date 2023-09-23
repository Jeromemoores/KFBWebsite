import { Component } from 'react'
import { ErrorToast, SuccessfullToast } from '../alerts/toasts'
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
	getLoads = async () => {
		try {
			const res = await Api.get(`${LoadsURL}/available`)
			if (res.status === 200) {
				SuccessfullToast('Sucessfull Message')
				this.setState({
					loads: res.data.map((load) => {
						return {
							...load,
							PPD: JSON.parse(load.pickupDetails),
							PPL: JSON.parse(load.pickupLocation),
							PDD: JSON.parse(load.deliveryDetails),
							PLI: JSON.parse(load.loadInformation),
						}
					}),
					loading: false,
				})
			} else {
				ErrorToast(`${res.status} : ${res.error}`)
				this.setState({
					loading: false,
				})
			}
		} catch (error) {
			ErrorToast(`Something went wrong: ${error}`)
			this.setState({
				loading: false,
			})
		}
	}
	componentDidMount = async () => {
		this.getLoads()
	}

	handleToggle = (load = {}) => {
		this.setState((prevState) => ({ selectedLoad: load, show: !prevState.show }))
	}
	handleSearchChange = (e) => {
		this.setState({ searchQuery: e.target.value })
	}
	getTrailerNames = (type) => {
		const trailer = ListOfTrailerTypes.find((t) => t.type === type)
		return trailer ? trailer.name : ' - '
	}
	filterLoads = () => {
		const { loads, searchQuery } = this.state
		const searchStr = searchQuery.toLowerCase()
		return loads.filter(({ PPD, PPL, PDD, PLI }) => {
			return (
				(PPD.loadNumber && PPD.loadNumber.includes(searchStr)) ||
				(PPL.city && PPL.city.toLowerCase().includes(searchStr)) ||
				(PPL.state && PPL.state.toLowerCase().includes(searchStr)) ||
				(PDD.address.city && PDD.address.city.toLowerCase().includes(searchStr)) ||
				(PDD.address.state && PDD.address.state.toLowerCase().includes(searchStr)) ||
				(PLI.trailerType && PLI.trailerType.toLowerCase().includes(searchStr)) ||
				(PLI.hazmat && PLI.hazmat.toLowerCase().includes(searchStr)) ||
				(PLI.miles && PLI.miles.toLowerCase().includes(searchStr))
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
								<th>Trailer Types</th>
								<th>Miles & Total</th>
							</tr>
						</thead>
						<tbody>
							{this.filterLoads().map((load) => (
								<tr key={load.id} onClick={() => this.handleToggle(load)} className='hoverable'>
									<td>{load.PPD.loadNumber || '-'}</td>
									<td>
										{load.PPL.city}, {load.PPL.state}
									</td>
									<td>
										{load.PDD.address.city}, {load.PDD.address.state}
									</td>
									<td>{load.PLI.hazmat === 'false' ? 'No' : 'Yes'}</td>
									<td className='custom-td'>
										<div className='cell-content'>
											{Array.isArray(load.PLI.trailerType)
												? load.PLI.trailerType.map((type) => this.getTrailerNames(type)).join(', ')
												: this.getTrailerNames(load.PLI.trailerType)}
										</div>
									</td>
									<td>
										{load.PLI.miles} ${load.PLI.miles * load.PLI.rate}
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
