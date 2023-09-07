import { Component } from 'react'
import { Badge } from 'react-bootstrap'
import { PencilFill, TrashFill, EyeFill } from 'react-bootstrap-icons'

import { ViewLoadShipper } from './viewLoadShipper'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

import '../../../style/loadsList.css'

export class LoadsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadList: [],
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
									<td>
										{load.loadStatus === 'loading' && <Badge variant='primary'>Loading</Badge>}
										{load.loadStatus === 'departed' && <Badge variant='info'>In Transit</Badge>}
										{load.loadStatus === 'unloading' && <Badge variant='warning'>Unloading</Badge>}
										{load.loadStatus === 'completed' && <Badge variant='success'>Completed</Badge>}
									</td>
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
										<button onClick={() => this.setSelectedLoad(load)}>
											<EyeFill />
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				{this.state.selectedLoad.id ? (
					<ViewLoadShipper selectedLoad={this.state.selectedLoad} close={this.close} show={this.show} />
				) : (
					<></>
				)}
			</div>
		)
	}
}
