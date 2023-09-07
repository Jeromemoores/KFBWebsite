import { Component } from 'react'

import Api from '../../api/axios'
import { LoadsURL } from '../../api/config'

import { ViewLoad } from './viewLoad'

export class CurrentLoads extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loads: [],
			selectedLoad: {},
			show: false,
		}
	}
	setSelectedLoad = (load) => {
		this.setState({
			selectedLoad: load,
		})
	}
	close = () => {
		this.setState({
			selectedLoad: {},
			show: false,
		})
	}
	show = () => {
		this.setState({
			show: true,
		})
	}
	async componentDidMount() {
		try {
			const res = await Api.get(`${LoadsURL}/claimedBy/${sessionStorage.getItem('token')}`)
			this.setState({
				loads: res.data,
			})
		} catch (error) {
			console.log(error)
		}
	}
	render() {
		const { loads } = this.state
		return (
			<div className='loadListWrapper'>
				<table className='loadListTable'>
					<thead>
						<tr>
							<th>Load Number</th>
							<th>Shipper Location</th>
							<th>Consignee Location</th>
							<th>Hazmat</th>
							<th>Trailer Type</th>
							<th>Miles & Total</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(loads).map((load) => {
							const pPUD = JSON.parse(load.pickupDetails)
							const pPUL = JSON.parse(load.pickupLocation)
							const pDD = JSON.parse(load.deliveryDetails)
							const pLI = JSON.parse(load.loadInformation)
							return (
								<tr
									key={load.id}
									onClick={() => {
										this.setSelectedLoad(load)
									}}
								>
									<td>{pPUD.loadNumber ? pPUD.loadNumber : '-'}</td>
									<td>
										{pPUL.city}, {pPUL.state}
									</td>
									<td>
										{pDD.address.city}, {pDD.address.state}
									</td>
									<td>{pLI.hazmat === 'false' ? 'No' : 'Yes'}</td>
									<td>{pLI.trailerType}</td>
									<td>
										{pLI.miles} ${pLI.miles * pLI.rate}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				{this.state.selectedLoad.id ? (
					<ViewLoad selectedLoad={this.state.selectedLoad} close={this.close} show={this.show} />
				) : (
					<></>
				)}
			</div>
		)
	}
}
