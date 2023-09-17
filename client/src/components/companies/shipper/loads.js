import { Component } from 'react'
import { Badge } from 'react-bootstrap'
import { PencilFill, TrashFill, EyeFill } from 'react-bootstrap-icons'

import { ViewLoad } from '../../loadboard/viewLoad'
import { EditLoad } from './editLoad'
import { Loader } from '../../loader'

import Api from '../../../api/axios'
import { LoadsURL } from '../../../api/config'

export class LoadsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadList: [],
			selectedLoad: {},
			editLoad: {},
			show: false,
			setShow: false,
			loading: false,
		}
	}
	setSelectedLoad = (load) => {
		this.setState({
			selectedLoad: load,
		})
	}
	setEditedLoad = (load) => {
		this.setState({
			editLoad: load,
		})
	}
	close = () => {
		this.setState({
			selectedLoad: {},
			show: false,
		})
	}
	setClose = () => {
		this.setState({
			editLoad: {},
			setShow: false,
		})
	}
	show = () => {
		this.setState({
			show: true,
		})
	}
	setShow = () => {
		this.setState({
			setShow: true,
		})
	}
	async componentDidMount() {
		this.setState({
			loading: true,
		})
		const { company } = this.props
		const response = await Api.get(`${LoadsURL}/companyId/${company?.id}`)
		this.setState({
			loadList: response.data,
		})
		setTimeout(() => {
			this.setState({
				loading: false,
			})
		}, 2000)
	}
	handleArchive = async (load) => {
		this.setState({
			loading: true,
		})
		const response = await Api.put(`${LoadsURL}/archive/${load.loadNumber}/${sessionStorage.getItem('token')}`)
		if (response.status === 200) {
			setTimeout(() => {
				this.setState({
					loading: false,
				})
			}, 2000)
			window.location.reload()
		} else {
			console.log(response)
		}
	}
	render() {
		const { loadList, loading, selectedLoad, editLoad } = this.state
		const { account } = this.props
		if (loading) {
			return <Loader message={'Loading list of loads.'} />
		}
		return (
			<div className='kfb-default-table-wrapper'>
				<table className='kfb-default-table'>
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
										{load.loadStatus === 'Available' && <Badge variant='info'>Available</Badge>}
										{load.loadStatus === 'loading' && <Badge variant='primary'>Loading</Badge>}
										{load.loadStatus === 'departed' && <Badge variant='info'>In Transit</Badge>}
										{load.loadStatus === 'unloading' && <Badge variant='warning'>Unloading</Badge>}
										{load.loadStatus === 'completed' && <Badge variant='success'>Completed</Badge>}
									</td>
									<td>{pLI.miles}</td>
									<td>{pLI.rate}</td>
									<td>${pLI.miles * pLI.rate}</td>
									<td className='td-buttons'>
										<button>
											<PencilFill onClick={() => this.setEditedLoad(load)} />
										</button>
										<button>
											<TrashFill onClick={() => this.handleArchive(load)} />
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
				{selectedLoad?.id ? <ViewLoad selectedLoad={this.state.selectedLoad} close={this.close} show={this.show} account={account} /> : <></>}
				{editLoad?.id ? <EditLoad editLoad={this.state.editLoad} setClose={this.setClose} setShow={this.setShow} account={account} /> : <></>}
			</div>
		)
	}
}
