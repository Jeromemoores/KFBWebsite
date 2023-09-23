import { Component } from 'react'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'

import '../../style/tables.css'

export class Employees extends Component {
	constructor(props) {
		super(props)
		this.state = {
			company: {},
			listOfEmployees: [],
		}
	}
	async componentDidMount() {
		this.setEmployees()
	}
	setEmployees = async () => {
		this.setState({
			company: this.props.company,
		})
		const parsedEmplopyees = JSON.parse(this.props.company?.employees)
		this.setState({
			listOfEmployees: parsedEmplopyees,
		})
	}
	render() {
		const { listOfEmployees } = this.state
		return (
			<div className='kfb-default-table-wrapper'>
				<table className='kfb-default-table'>
					<thead>
						<tr>
							<td>Name</td>
							<td>Email</td>
							<td>Type</td>
							<td>Options</td>
						</tr>
					</thead>
					<tbody>
						{listOfEmployees.map((employee) => {
							return (
								<tr key={employee.id}>
									<td>{employee.name}</td>
									<td>{employee.email}</td>
									<td>{employee.type}</td>
									<td className='td-buttons'>
										<button>
											<PencilFill />
										</button>
										<button>
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
