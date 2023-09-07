import { Component } from 'react'
import { Card } from 'react-bootstrap'

import Api from '../../api/axios'
import { KFBURL } from '../../api/config'

export class InviteCode extends Component {
	constructor(props) {
		super(props)
		this.state = {
			code: '',
		}
	}
	handleNewCode = async () => {
		const newCode = await Api.post(`${KFBURL}/newInvite/${sessionStorage.getItem('token')}`)
		this.setState({
			code: newCode.data.data,
		})
	}
	async componentDidMount() {
		await this.handleNewCode()
	}
	copyToClip = async () => {
		const { code } = this.state
		try {
			await navigator.clipboard.writeText(code)
		} catch (error) {
			console.log(`Error copying code :${error}`)
		}
	}
	render() {
		const { code } = this.state
		return (
			<div className='authCodeWrapper'>
				<h5>Sent this to company creator.</h5>
				<hr className='styledHr' />
				<div className='authCode'>
					<p>{code}</p>
					<button onClick={this.copyToClip}>Copy Code</button>
				</div>
			</div>
		)
	}
}
