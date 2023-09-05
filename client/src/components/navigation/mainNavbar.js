import { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import '../../style/navbar.css'

export class MainNavbar extends Component {
	render() {
		const { account } = this.props
		return (
			<Navbar collapseOnSelect expand='lg' className='MainNavbar'>
				<Navbar.Brand>Kindred Freight Brokerage</Navbar.Brand>
				<Navbar.Toggle aria-controls='MainNav' />
				<Navbar.Collapse id='MainNav'>
					<Nav className='me-auto'>
						<NavDropdown title='Shippers' align='end'>
							<NavDropdown.Item href='/shipping-home'>Shipping Home</NavDropdown.Item>
							<NavDropdown.Item href='/shipper/sign-up'>Ship With Us</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav className='ms-auto'>
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
