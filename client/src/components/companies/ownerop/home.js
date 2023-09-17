import { Component } from 'react'

import { CurrentLoads } from '../currentLoads'
import { CompletedLoads } from '../completedLoads'

export class OwneropHomeComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentLoads: false,
			completedLoads: false,
		}
	}
	updateState = (newState) => {
		this.setState({
			currentLoads: false,
			completedLoads: false,
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
					<button onClick={() => this.toggleState('currentLoads')}>View Current Loads</button>
					<button onClick={() => this.toggleState('completedLoads')}>View Completed Loads</button>
				</div>
				<div className='homeContent'>
					{values.currentLoads ? <CurrentLoads company={company} account={account} /> : <></>}
					{values.completedLoads ? <CompletedLoads company={company} account={account} /> : <></>}
				</div>
			</div>
		)
	}
}
