import React, { useState, useEffect } from 'react';
import { GET_ALL_DEPARTMENT } from '../api/apiService';
import { Table } from 'react-bootstrap';

function Department() {
	const [deps, setDeps] = useState([]);

	useEffect(() => {
		async function refreshList() {
			const list = await GET_ALL_DEPARTMENT();
			setDeps(list.data);
		};
		refreshList();
	}, []);


	return (
		<div >
			<Table className="mt-4" striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{deps.map(dep =>
						<tr key={dep.Id}>
							<td>{dep.Id}</td>
							<td>{dep.Name}</td>
							<td>Edit/Delete</td>
						</tr>)}
				</tbody>
			</Table>
		</div>
	)
}

export default Department;

