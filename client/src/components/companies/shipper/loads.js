import { Component } from 'react'
import { Badge, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { PencilFill, TrashFill, EyeFill } from 'react-bootstrap-icons'

import { ErrorToast, SuccessfullToast } from '../../alerts/toasts'

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
		try {
			const res = await Api.get(`${LoadsURL}/companyId/${this.props.company?.id}`)
			if (res.status === 200) {
				SuccessfullToast('Loads were retrieved... Setting Data')
				this.setState({
					loadList: res.data,
					loading: false,
				})
			} else {
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			ErrorToast(`Something went wrong: ${error}`)
		}
	}
	handleArchive = async (load) => {
		this.setState({
			loading: true,
		})
		try {
			const res = await Api.put(`${LoadsURL}/archive/${load.loadNumber}/${sessionStorage.getItem('token')}`)
			if (res.status === 200) {
				this.setState({
					loading: false,
				})
				SuccessfullToast('Load was archived... Refreshing page')
				setTimeout(() => {
					window.location.reload()
				}, 2500)
			} else {
				this.setState({
					loading: false,
				})
				ErrorToast(`${res.status} : ${res.error}`)
			}
		} catch (error) {
			this.setState({
				loading: false,
			})
			ErrorToast(`Something went wrong: ${error}`)
		}
	}

	render() {
		const { loadList, loading, selectedLoad, editLoad } = this.state
		const { account } = this.props
		if (loading) {
			return <Loader message={'Loading list of loads.'} />
		}
		const statusDetails = {
			available: { color: 'info', text: 'Available', tooltip: false, textColor: 'dark' },
			claimed: { color: 'success', text: 'Load Claimed', tooltip: true, textColor: 'dark' },
			deadHead: { color: 'info', text: 'In Transit', tooltip: true, textColor: 'dark' },
			loading: { color: 'primary', text: 'Loading', tooltip: true, textColor: 'dark' },
			departed: { color: 'info', text: 'In Transit', tooltip: true, textColor: 'dark' },
			unloading: { color: 'warning', text: 'Unloading', tooltip: true, textColor: 'dark' },
			completed: { color: 'success', text: 'Completed', tooltip: true, textColor: 'dark' },
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
										{statusDetails[load.loadStatus] &&
											(statusDetails[load.loadStatus].tooltip ? (
												<OverlayTrigger
													overlay={<Tooltip id={`tooltip-${load.loadStatus}`}>{load.claimerStatus || 'Unknown Driver Status'}</Tooltip>}
												>
													<Badge bg={statusDetails[load.loadStatus].color} text={statusDetails[load.loadStatus].textColor || ''}>
														{statusDetails[load.loadStatus].text}
													</Badge>
												</OverlayTrigger>
											) : (
												<Badge bg={statusDetails[load.loadStatus].color} text={statusDetails[load.loadStatus].textColor || ''}>
													{statusDetails[load.loadStatus].text}
												</Badge>
											))}
									</td>
									<td>{pLI.miles}</td>
									<td>{pLI.rate}</td>
									<td>${pLI.miles * pLI.rate}</td>
									<td className='td-buttons'>
										<button onClick={() => this.setEditedLoad(load)}>
											<PencilFill />
										</button>
										<button onClick={() => this.handleArchive(load)}>
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
				{selectedLoad?.id ? <ViewLoad selectedLoad={this.state.selectedLoad} close={this.close} show={this.show} account={account} /> : <></>}
				{editLoad?.id ? <EditLoad editLoad={this.state.editLoad} setClose={this.setClose} setShow={this.setShow} account={account} /> : <></>}
			</div>
		)
	}
}
