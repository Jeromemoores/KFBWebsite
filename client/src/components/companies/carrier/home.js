import { Component } from 'react'

import { Employees } from '../employees'
import { CurrentLoads } from '../currentLoads'
import { CompletedLoads } from '../completedLoads'
import { InviteCode } from '../inviteCode'

export class CarrierHomeComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			employees: false,
			currentLoads: false,
			completedLoads: false,
			inviteCode: false,
		}
	}
	updateState = (newState) => {
		this.setState({
			employees: false,
			currentLoads: false,
			completedLoads: false,
			inviteCode: false,
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
			<div className='home-wrapper'>
				<div className='home-side'>
					<button onClick={() => this.toggleState('employees')}>View Employees</button>
					<button onClick={() => this.toggleState('currentLoads')}>View Current Loads</button>
					<button onClick={() => this.toggleState('completedLoads')}>View Completed Loads</button>
					<button onClick={() => this.toggleState('inviteCode')}>Show Invitation Code</button>
				</div>
				<div className='home-content'>
					{values.employees ? <Employees company={company} /> : <></>}
					{values.inviteCode ? <InviteCode company={company} /> : <></>}
					{values.currentLoads ? <CurrentLoads company={company} account={account} /> : <></>}
					{values.completedLoads ? <CompletedLoads company={company} account={account} /> : <></>}
				</div>
			</div>
		)
	}
}
