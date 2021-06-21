import React, { useState, useEffect } from 'react';
import { GET_EMPLOYEE } from '../api/apiService';

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
				{
					emps.map(emp =>
						<div className="col-sm-6 col-lg-4">
							<div className="card"
								style={{ width: '18rem', marginTop: '24px', marginBottom: '24px' }}>

								<a href={emp.PhotoURL}>
									<img src={emp.PhotoURL} className="card-img-top" alt="Image" />
								</a>
								<div className="card-body">
									<a href={emp.PhotoURL}>
										<h5 className="card-title">{emp.Name}</h5>
									</a>
									<p className="card-text">{emp.Department}</p>
									<p className="card-text">{emp.DateOfJoining}</p>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}
