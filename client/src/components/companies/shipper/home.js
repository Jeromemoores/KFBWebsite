import { Component } from 'react'

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
	render() {
		const { ...values } = this.state
		const { company, account } = this.props
		return (
			<div className='homeWrapper'>
				<div className='homeSide'>
					<button onClick={() => this.toggleState('viewEmployees')}>View Employees</button>
					<button onClick={() => this.toggleState('newLoad')}>Post a new load</button>
					<button onClick={() => this.toggleState('showLoads')}>View Loads</button>
					<button onClick={() => this.toggleState('showInviteCode')}>Show Invitation Code</button>
				</div>
				<div className='homeContent'>
					{values.viewEmployees ? <Employees company={company} /> : <></>} {values.showAuthCode ? <InviteCode company={company} /> : <></>}
					{values.newLoad ? <NewLoad /> : <></>}
					{values.showLoads ? <LoadsList company={company} account={account} /> : <></>}
				</div>
			</div>
		)
	}
}
