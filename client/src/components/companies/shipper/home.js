import { Component } from 'react'

import { AuthCode } from '../authCode'
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
			showAuthCode: false,
		}
	}
	updateState = (newState) => {
		this.setState({
			newLoad: false,
			viewEmployees: false,
			showLoads: false,
			showAuthCode: false,
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
					<button onClick={() => this.toggleState('showAuthCode')}>Show Invitation Code</button>
				</div>
				<div className='homeContent'>
					{values.viewEmployees ? <Employees company={company} /> : <></>}{' '}
					{values.showAuthCode ? <AuthCode company={company} /> : <></>}
					{values.newLoad ? <NewLoad /> : <></>}
					{values.showLoads ? <LoadsList company={company} account={account} /> : <></>}
				</div>
			</div>
		)
	}
}
