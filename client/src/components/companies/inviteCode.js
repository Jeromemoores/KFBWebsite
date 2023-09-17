import { Component } from 'react'

import '../../style/invite.css'

export class InviteCode extends Component {
	copyToClip = async () => {
		const { company } = this.props
		try {
			await navigator.clipboard.writeText(company.authCode)
		} catch (error) {
			console.log(`Error copying code :${error}`)
		}
	}
	render() {
		const { company } = this.props
		return (
			<div className='invite-code-page-wrapper'>
				<h5>Invitation Code</h5>
				<hr className='styled-hr' />
				<div className='invite-code-wrapper'>
					<p>{company.authCode}</p>
					<button onClick={this.copyToClip}>Copy Code</button>
				</div>
			</div>
		)
	}
}
