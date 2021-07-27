import React, { useEffect } from 'react';
import { Card, Row, Container, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PHOTO_PATH_URL } from '../extension/AppURL';
import { GetEmps } from '../redux/slices/employeeSlice';

export default function Home() {
	const emps = useSelector(state => state.employee);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(GetEmps());
	}, [dispatch]);

	return (
		<Container>
			<Row>
				{emps.map(emp =>
					<Col key={emp.Id} sm={6} lg={4}>
						<Card className="card-home">
							<Card.Img variant="top" src={PHOTO_PATH_URL + emp.PhotoURL}
								className="img-home" />
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
