import React, { useState, useEffect } from 'react';
import { GET_EMPLOYEE } from '../api/apiService';
import { Card } from 'react-bootstrap';

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
		<div class="mt4">
			<div class="row">
				{emps.map(emp =>
					<div className="col-sm-6 col-lg-4">
						<Card style={{ width: '18rem', marginTop: '24px', marginBottom: '24px' }}>
							<Card.Img variant="top" src={emp.PhotoURL} />
							<Card.Body>
								<Card.Title>{emp.Name}</Card.Title>
								<Card.Text>{emp.Department}</Card.Text>
								<Card.Text>{emp.DateOfJoining}</Card.Text>
							</Card.Body>
						</Card>
					</div>)
				}
			</div>
		</div>
	)
}
