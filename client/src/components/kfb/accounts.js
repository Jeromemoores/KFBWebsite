import { Component } from 'react'
import { PencilFill, TrashFill, PassFill } from 'react-bootstrap-icons'
import { Loader } from '../loader'

import Api from '../../api/axios'
import { DATAURL } from '../../api/config'

export class KFBAccountList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: [],
			searchQuery: '',
			loading: false,
		}
	}

	componentDidMount = async () => {
		this.setState({ loading: true })
		const res = await Api.get(`${DATAURL}/allAccounts/${sessionStorage.getItem('token')}`)
		this.setState({
			accounts: res.data,
			loading: false,
		})
	}
	handleSearchChange = (e) => {
		this.setState({ searchQuery: e.target.value })
	}
	handleToggle = (load = {}) => {
		this.setState((prevState) => ({ selectedLoad: load, show: !prevState.show }))
	}
	filterAccounts = () => {
		const { accounts, searchQuery } = this.state
		const searchStr = searchQuery.toLowerCase()

		return accounts.filter((account) => {
			return (
				(account.id && account.id.toString().toLowerCase().includes(searchStr)) ||
				(account.name && account.name.toLowerCase().includes(searchStr)) ||
				(account.email && account.email.toLowerCase().includes(searchStr)) ||
				(account.companyId && account.companyId.toString().toLowerCase().includes(searchStr)) ||
				(account.companyType && account.companyType.toLowerCase().includes(searchStr))
			)
		})
	}

	render() {
		const { loading, searchQuery } = this.state
		if (loading) return <Loader message={'Loading list of Accounts'} />
		return (
			<div className='kfb-default-table-page-wrapper'>
				<div className='kfb-default-table-search-input'>
					<input type='text' placeholder='Search...' value={searchQuery} onChange={this.handleSearchChange} />
				</div>
				<div className='kfb-default-table-wrapper' style={{ margin: '2%' }}>
					<table className='kfb-default-table'>
						<thead>
							<tr>
								<th>Account Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Company Id</th>
								<th>Company Type</th>
								<th>Account Level</th>
								<th style={{ textAlign: 'center' }}>Options</th>
							</tr>
						</thead>
						<tbody>
							{this.filterAccounts().map((account) => {
								return (
									<tr key={account.id}>
										<td>{account.id}</td>
										<td>{account.name}</td>
										<td>{account.email}</td>
										<td>{account.companyId}</td>
										<td>{account.companyType}</td>
										<td>{account.level}</td>
										<td className='td-buttons'>
											<button>
												<PencilFill />
											</button>
											<button>
												<TrashFill />
											</button>
											<button>
												<PassFill />
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
