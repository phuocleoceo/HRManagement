import React, { useState, useEffect } from 'react';
import { GET_EMPLOYEE } from '../api/apiService';
import { Card, Row, Container, Col } from 'react-bootstrap';

export default function Home() {
	const [emps, setEmps] = useState([]);
	useEffect(() => {
		async function refreshList() {
			const list = await GET_EMPLOYEE();
			setEmps(list.data);
		};
		refreshList();
	}, []);

	return (
		<Container>
			<Row>
				{emps.map(emp =>
					<Col sm={6} lg={4}>
						<Card style={{ width: '18rem', marginTop: '24px', marginBottom: '24px' }}>
							<Card.Img variant="top" src={emp.PhotoURL} />
							<Card.Body>
								<Card.Title>{emp.Name}</Card.Title>
								<Card.Text>{emp.Department}</Card.Text>
								<Card.Text>{emp.DateOfJoining}</Card.Text>
							</Card.Body>
						</Card>
					</Col>)
				}
			</Row>
		</Container>
	)
}
