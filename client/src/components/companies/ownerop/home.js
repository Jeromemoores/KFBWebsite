import { Component } from 'react'

import { CurrentLoads } from '../currentLoads'

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
		return (
			<div className='homeWrapper'>
				<div className='homeSide'>
					<button onClick={() => this.toggleState('currentLoads')}>View Current Loads</button>
					<button onClick={() => this.toggleState('completedLoads')}>View Completed Loads</button>
				</div>
				<div className='homeContent'>{values.currentLoads ? <CurrentLoads /> : <></>}</div>
			</div>
		)
	}
}
