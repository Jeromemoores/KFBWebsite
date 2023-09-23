import { Component } from 'react'
import { PeopleFill, Envelope, ViewList, PlusLg } from 'react-bootstrap-icons'

import { InviteCode } from '../inviteCode'
import { Employees } from '../employees'
import { NewLoad } from './newLoad'
import { LoadsList } from './loads'

export class ShipperHomeComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newLoad: false,
			viewEmployees: false,
			showLoads: false,
			showInviteCode: false,
			isSideHovered: false,
		}
	}
	updateState = (newState) => {
		this.setState({
			newLoad: false,
			viewEmployees: false,
			showLoads: false,
			showInviteCode: false,
			...newState,
		})
	}
	toggleState = (stateKey) => {
		this.updateState({ [stateKey]: !this.state[stateKey] })
	}
	handleSideHover = (isHovered) => {
		this.setState({ isSideHovered: isHovered })
	}
	render() {
		const { isSideHovered, ...values } = this.state
		const { company, account } = this.props
		return (
			<div className='home-wrapper'>
				<div className='home-side'>
					<button onClick={() => this.toggleState('viewEmployees')}>
						<span>View Employees</span> <PeopleFill />
					</button>
					<button onClick={() => this.toggleState('newLoad')}>
						<span>Post New Load</span> <PlusLg />
					</button>
					<button onClick={() => this.toggleState('showLoads')}>
						<span>View Loads</span> <ViewList />
					</button>
					<button onClick={() => this.toggleState('showInviteCode')}>
						<span>View Invite Code</span> <Envelope />
					</button>
				</div>
				<div className='home-content'>
					{values.viewEmployees ? <Employees company={company} /> : null}
					{values.showInviteCode ? <InviteCode company={company} /> : null}
					{values.newLoad ? <NewLoad /> : null}
					{values.showLoads ? <LoadsList company={company} account={account} /> : null}
				</div>
			</div>
		)
	}
}
