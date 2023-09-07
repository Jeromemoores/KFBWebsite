import { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import '../../style/navbar.css'

export class MainNavbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
		}
	}
	async componentDidMount() {
		const { account } = this.props
		this.setState({
			account: account,
		})
	}
	render() {
		const { account } = this.state
		return (
			<Navbar collapseOnSelect expand='lg' className='MainNavbar'>
				<Navbar.Brand href='/'>Kindred Freight Brokerage</Navbar.Brand>
				<Navbar.Toggle aria-controls='MainNav' />
				<Navbar.Collapse id='MainNav'>
					<Nav className='me-auto'>
						{account?.companyType !== 'carrier' && account?.companyType !== 'ownerop' ? (
							<NavDropdown title='Shippers' align='end'>
								{account?.companyType !== 'shipper' ? (
									<NavDropdown.Item href='/shipper/sign-up'>Ship With Us</NavDropdown.Item>
								) : (
									<NavDropdown.Item href='/shipper/home'>Home</NavDropdown.Item>
								)}
							</NavDropdown>
						) : (
							<></>
						)}
						{account?.companyType !== 'shipper' && account?.companyType !== 'ownerop' ? (
							<NavDropdown title='Carriers' align='end'>
								{account?.companyType !== 'carrier' ? (
									<NavDropdown.Item href='/carrier/sign-up'>Ship For Us</NavDropdown.Item>
								) : (
									<NavDropdown.Item href='/carrier/home'>Home</NavDropdown.Item>
								)}
							</NavDropdown>
						) : (
							<></>
						)}
						{account?.companyType !== 'shipper' && account?.companyType !== 'carrier' ? (
							<NavDropdown title='Owner Operator' align='end'>
								{account?.companyType !== 'ownerop' ? (
									<NavDropdown.Item href='/ownerop/sign-up'>Haul For Us</NavDropdown.Item>
								) : (
									<NavDropdown.Item href='ownerop/home'>Home</NavDropdown.Item>
								)}
							</NavDropdown>
						) : (
							<></>
						)}

						<Nav.Link href='/loadboard'>Load Board</Nav.Link>
					</Nav>
					<Nav className='ms-auto'>
						{account?.level === 100 ? (
							<NavDropdown title='KFB Quick Options' align='end'>
								<NavDropdown.Item href='/kfb/inviteCompany'>Create Company Invite Code</NavDropdown.Item>
							</NavDropdown>
						) : (
							<></>
						)}

						<NavDropdown title={account ? account.name : 'Account'} align='end'>
							{account === null ? (
								<>
									<NavDropdown.Item href='/sign-in'>Sign In</NavDropdown.Item>
									<NavDropdown.Item href='/sign-up'>Sign Up</NavDropdown.Item>
								</>
							) : (
								<>
									<NavDropdown.Item href='/my-account'>View Account</NavDropdown.Item>
									<NavDropdown.Item href='/my-settings'>Settings</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='/sign-out'>Sign Out</NavDropdown.Item>
								</>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}
