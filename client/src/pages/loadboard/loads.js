import { Component } from 'react'

import { LoadList } from '../../components'

import Api from '../../api/axios'
import { LoadsURL } from '../../api/config'

export class LoadboardPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listOfLoads: [],
		}
	}
	async componentDidMount() {
		await this.fetchLoads()
	}
	async fetchLoads() {
		const res = await Api.get(`${LoadsURL}/available`)
		this.setState({
			listOfLoads: res.data,
		})
	}
	render() {
		const { listOfLoads } = this.state
		return <LoadList loads={listOfLoads} />
	}
}
