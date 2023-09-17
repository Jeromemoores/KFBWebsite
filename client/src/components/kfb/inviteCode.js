import { Component } from 'react'
import { TrashFill, ClipboardPlusFill } from 'react-bootstrap-icons'
import { Loader } from '../loader'

import Api from '../../api/axios'
import { KFBURL } from '../../api/config'

export class InviteCode extends Component {
	constructor(props) {
		super(props)
		this.state = {
			codes: [],
			loading: false,
		}
	}
	handleNewCode = async () => {
		const { codes } = this.state
		const newCode = await Api.post(`${KFBURL}/newInvite/${sessionStorage.getItem('token')}`)
		this.setState({ codes: [...codes, newCode.data.data] })
	}
	handleDelete = async (id) => {
		try {
			await Api.delete(`${KFBURL}/invite/${sessionStorage.getItem('token')}/${id}`)
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}
	componentDidMount = async () => {
		this.setState({ loading: true })
		const codes = await Api.get(`${KFBURL}/invites/${sessionStorage.getItem('token')}`)
		this.setState({ codes: codes.data, loading: false })
	}
	copyToClip = async (code) => {
		try {
			await navigator.clipboard.writeText(code)
		} catch (error) {
			console.log(`Error copying code :${error}`)
		}
	}
	render() {
		const { codes, loading } = this.state
		if (loading) return <Loader message={'Loading auth code list'} />
		return (
			<div className='kfb-default-table-wrapper' style={{ margin: '2%' }}>
				<div className='kfb-default-table-header-button' style={{ marginBottom: '2%' }}>
					<button onClick={() => this.handleNewCode()}>Create a new code</button>
				</div>
				<table className='kfb-default-table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Creator ID</th>
							<th>Code</th>
							<th>Used</th>
							<th>Created On</th>
							<th>Used On</th>
							<th>Option</th>
						</tr>
					</thead>
					<tbody>
						{codes.map((code) => {
							const FCA = code.createdAt.replace('T', ' ').split('.')[0]
							const FUA = code.updatedAt.replace('T', ' ').split('.')[0]
							return (
								<tr key={code.id}>
									<td>{code.id}</td>
									<td>{code.creator}</td>
									<td>{code.code}</td>
									<td>{code.used === 'false' ? 'No' : 'Yes'}</td>
									<td>{FCA}</td>
									<td>{FCA !== FUA ? FUA : '-'}</td>
									<td className='td-buttons'>
										<button onClick={() => this.copyToClip(code.code)}>
											<ClipboardPlusFill />
										</button>
										<button onClick={() => this.handleDelete(code.id)}>
											<TrashFill />
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}
