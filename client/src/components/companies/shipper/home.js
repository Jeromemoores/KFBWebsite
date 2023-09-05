import { Component } from 'react'

import { Employees } from './employees'
import { AuthCode } from './authCode'
import { NewLoad } from './newLoad'
import { LoadsList } from './loads'
import '../../../style/shipperhome.css'

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
		const { company } = this.props
		return (
			<div className='shipperHomeWrapper'>
				<div className='shipperSide'>
					<button onClick={() => this.toggleState('viewEmployees')}>View Employees</button>
					<button onClick={() => this.toggleState('newLoad')}>Post a new load</button>
					<button onClick={() => this.toggleState('showLoads')}>View Loads</button>
					<button onClick={() => this.toggleState('showAuthCode')}>Show Invitation Code</button>
				</div>
				<div className='shipperContent'>
					{values.viewEmployees ? <Employees company={company} /> : <></>}{' '}
					{values.showAuthCode ? <AuthCode company={company} /> : <></>}
					{values.newLoad ? <NewLoad /> : <></>}
					{values.showLoads ? <LoadsList company={company} /> : <></>}
				</div>
			</div>
		)
	}
}
