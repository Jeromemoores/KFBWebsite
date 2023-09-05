import { Component } from 'react'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

import '../../../style/loadsList.css'

export class LoadsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadList: [],
		}
	}
	async componentDidMount() {
		const { company } = this.props
		const response = await Api.get(`${LoadsURL}/companyId/${company?.id}`)
		this.setState({
			loadList: response.data,
		})
	}
	render() {
		const { loadList } = this.state
		return (
			<div className='loadListWrapper'>
				<table className='loadListTable'>
					<thead>
						<tr>
							<th>Load Number</th>
							<th>Tracking Number</th>
							<th>Consignee</th>
							<th>Status</th>
							<th>Miles</th>
							<th>Rate</th>
							<th>Total</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(loadList).map((load) => {
							const pPUD = JSON.parse(load.pickupDetails)
							const pDD = JSON.parse(load.deliveryDetails)
							const pLI = JSON.parse(load.loadInformation)
							return (
								<tr key={load.id}>
									<td>{pPUD.loadNumber ? pPUD.loadNumber : '-'}</td>
									<td>{load.trackingNumber}</td>
									<td>{pDD.name}</td>
									<td>{load.loadStatus}</td>
									<td>{pLI.miles}</td>
									<td>{pLI.rate}</td>
									<td>{pLI.miles * pLI.rate}</td>
									<td>
										<button>
											<PencilFill />
										</button>
										<button>
											<TrashFill />
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}
