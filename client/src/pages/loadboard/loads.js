import { Component } from 'react'

import { LoadList } from '../../components'

export class LoadboardPage extends Component {
	render() {
		const { account } = this.props
		return <LoadList account={account} />
	}
}
