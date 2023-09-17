import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

export class NoAccess extends Component {
	render() {
		return (
			<Container className='mt-5'>
				<Row className='justify-content-center'>
					<Col md={6} className='text-center'>
						<h1>404</h1>
						<p>Oops! The page you are looking for does not exist.</p>
						<Button variant='primary' href='/'>
							Go Home
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}
