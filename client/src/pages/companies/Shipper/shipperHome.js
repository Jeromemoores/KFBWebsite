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
		await this.fetchCompanyAndLoads()
	}
	async fetchCompanyAndLoads() {
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
		return <ShipperHomeComponent company={company} />
	}
}
