import { Component } from 'react'

import { ShipperHomeComponent } from '../../../components'

import Api from '../../../api/axios'
import { CompanyURL } from '../../../api/config'

export class ShipperHome extends Component {
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
		return <ShipperHomeComponent company={company} account={account} />
	}
}
