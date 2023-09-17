import { Component } from 'react'

import '../../style/auth.css'

export class AuthCode extends Component {
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
			<div className='authCodeWrapper'>
				<h5>Invitation Code</h5>
				<hr className='styledHr' />
				<div className='authCode'>
					<p>{company.authCode}</p>
					<button onClick={this.copyToClip}>Copy Code</button>
				</div>
			</div>
		)
	}
}
