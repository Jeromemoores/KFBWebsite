import { Component } from 'react'
import { PeopleFill, Envelope, ViewList } from 'react-bootstrap-icons'
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
			<div className='home-wrapper'>
				<div className='home-side'>
					<button onClick={() => this.toggleState('loads')}>
						<span>View Loads</span> <ViewList />
					</button>
					<button onClick={() => this.toggleState('accounts')}>
						<span>View Accounts</span> <PeopleFill />
					</button>
					<button onClick={() => this.toggleState('companyJoin')}>
						<span>View Invite Codes</span> <Envelope />
					</button>
				</div>
				<div className='home-content'>
					{values.loads ? <KFBLoadList /> : <></>}
					{values.accounts ? <KFBAccountList /> : <></>}
					{values.companyJoin ? <InviteCode /> : <></>}
				</div>
			</div>
		)
	}
}
