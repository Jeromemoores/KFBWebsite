import { Component } from 'react'
import { PeopleFill, ViewList, List, Envelope } from 'react-bootstrap-icons'

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
			isSideHovered: false,
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
	handleSideHover = (isHovered) => {
		this.setState({ isSideHovered: isHovered })
	}
	render() {
		const { isSideHovered, ...values } = this.state
		const { company, account } = this.props
		return (
			<div className='home-wrapper'>
				<div className='home-side' onMouseEnter={() => this.handleSideHover(true)} onMouseLeave={() => this.handleSideHover(false)}>
					<button onClick={() => this.toggleState('employees')}>{isSideHovered ? 'View Employees' : <PeopleFill />}</button>
					<button onClick={() => this.toggleState('currentLoads')}>{isSideHovered ? 'View Current Loads' : <ViewList />}</button>
					<button onClick={() => this.toggleState('completedLoads')}>{isSideHovered ? 'View Completed Loads' : <List />}</button>
					<button onClick={() => this.toggleState('inviteCode')}>{isSideHovered ? 'View Invite Code' : <Envelope />}</button>
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
