import { Component } from 'react'
import { TrashFill, EyeFill } from 'react-bootstrap-icons'
import { Loader } from '../loader'

import { ErrorToast, SuccessfullToast } from '../alerts/toasts'
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
	fetchLoads = async () => {
		this.setState({ loading: true })
		try {
			const res = await Api.get(`${DATAURL}/allLoads/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				this.setState({
					loads: res.data.map((load) => {
						return {
							...load,
							PPD: JSON.parse(load.pickupDetails),
							PPL: JSON.parse(load.pickupLocation),
							PDD: JSON.parse(load.deliveryDetails),
							PLI: JSON.parse(load.loadInformation),
							PPI: JSON.parse(load.paid),
						}
					}),
					loading: false,
				})
				SuccessfullToast('Loads were retrieved... Setting Data')
			} else {
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			ErrorToast(`Something went wrong: ${error}`)
		}
	}
	componentDidMount = async () => {
		this.fetchLoads()
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
	deleteLoad = async (load) => {
		try {
			const res = await Api.delete(`${DATAURL}/delete/${load.id}/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				SuccessfullToast(`Load ${load.id} was deleted`)
				this.fetchLoads()
			} else {
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			ErrorToast(`Something went wrong: ${error}`)
		}
	}

	filterLoads = () => {
		const { loads, searchQuery } = this.state
		const searchStr = searchQuery.toLowerCase()

		return loads.filter((load) => {
			const { PPD, PPL, PDD, PLI } = load

			return (
				(PPD.loadNumber && PPD.loadNumber.includes(searchStr)) ||
				(PPL.city && PPL.city.toLowerCase().includes(searchStr)) ||
				(PPL.state && PPL.state.toLowerCase().includes(searchStr)) ||
				(PDD.address.city && PDD.address.city.toLowerCase().includes(searchStr)) ||
				(PDD.address.state && PDD.address.state.toLowerCase().includes(searchStr)) ||
				(PLI.trailerType && PLI.trailerType.toLowerCase().includes(searchStr)) ||
				(PLI.hazmat && PLI.hazmat.toLowerCase().includes(searchStr)) ||
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
								<tr key={load.id} className={`${load.companyId === 0 ? 'dark-red-bg' : ''}`}>
									<td>{load.loadNumber}</td>
									<td>{load.companyId}</td>
									<td>{load.PPD.loadNumber || '-'}</td>
									<td>{load.PPL.name}</td>
									<td>{load.PDD.name}</td>
									<td>{load.trackingNumber}</td>
									<td>{load.PPI.broker === false ? 'No' : 'Yes'}</td>
									<td>{load.PPI.carrier === false ? 'No' : 'Yes'}</td>
									<td className='td-buttons'>
										<button onClick={() => this.handleToggle(load)}>
											<EyeFill />
										</button>
										<button onClick={() => this.deleteLoad(load)}>
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
