import { Component } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export class Loader extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: '',
		}
	}
	async componentDidMount() {
		const { message } = this.props
		this.setState({
			message: message,
		})
	}
	render() {
		const { message } = this.state
		return (
			<div className='loadingMessage'>
				<p>{message}</p>
				<InfinitySpin width='200' color='white' />
			</div>
		)
	}
}
