import { Component } from 'react'

import Api from '../../../api/axios'
import { CompanyURL } from '../../../api/config'
import { OwneropHomeComponent } from '../../../components'

export class OwneropHome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			company: {},
		}
	}
	async componentDidMount() {
		await this.fetchCompany()
	}
	async fetchCompany() {
		const { account } = this.props
		if (account !== null) {
			const res = await Api.get(`${CompanyURL}/findById/${account?.company}`)
			this.setState({
				company: res.data,
			})
		}
	}
	render() {
		const { company } = this.state
		const { account } = this.props
		return <OwneropHomeComponent account={account} company={company} />
	}
}
