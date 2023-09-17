import { Component } from 'react'

import { KFBAccountList } from './accounts'
import { KFBLoadList } from './loads'
import { InviteCode } from './inviteCode'

export class KFBHomeComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loads: false,
			accounts: false,
			companyJoin: false,
		}
	}
	updateState = (newState) => {
		this.setState({
			loads: false,
			accounts: false,
			companyJoin: false,
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
					<button onClick={() => this.toggleState('loads')}>View Loads</button>
					<button onClick={() => this.toggleState('accounts')}>View Accounts</button>
					<button onClick={() => this.toggleState('companyJoin')}>Show Invitation Codes</button>
				</div>
				<div className='homeContent'>
					{values.loads ? <KFBLoadList /> : <></>}
					{values.accounts ? <KFBAccountList /> : <></>}
					{values.companyJoin ? <InviteCode /> : <></>}
				</div>
			</div>
		)
	}
}
