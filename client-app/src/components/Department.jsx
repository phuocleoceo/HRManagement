import React, { useState, useEffect } from 'react';
import { GET_DEPARTMENT, PUT_DEPARTMENT, DELETE_DEPARTMENT } from '../api/apiService';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddDepModal from './AddDepModal';

function Department() {
	const [deps, setDeps] = useState([]);
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);

	useEffect(() => {
		async function refreshList() {
			const list = await GET_DEPARTMENT();
			setDeps(list.data);
		};
		refreshList();
	}, [addModalShow]);

	function addModalClose() {
		setAddModalShow(false);
	}

	function editModalClose() {
		setEditModalShow(false);
	}

	return (
		<div >
			<Table className="mt-4" striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Actions</th>
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

			<ButtonToolbar>
				<Button variant='primary'
					onClick={() => setAddModalShow(true)}>
					Add Department
				</Button>

				<AddDepModal show={addModalShow}
					onHide={addModalClose} />
			</ButtonToolbar>
		</div>
	)
}

export default Department;

