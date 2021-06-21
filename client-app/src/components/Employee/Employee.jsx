import React, { useState, useEffect } from 'react';
import { GET_EMPLOYEE, DELETE_EMPLOYEE } from '../../api/apiService';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';

function Employee() {
	const [emps, setEmps] = useState([]);
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [reload, setReload] = useState(0);
	const [currentEmp, setCurrentEmp] = useState({
		Id: 0, Name: "", DepartmentId: 0,
		DateOfJoining: "", PhotoURL: ""
	});

	useEffect(() => {
		async function refreshList() {
			const list = await GET_EMPLOYEE();
			setEmps(list.data);
		};
		refreshList();
	}, [reload]);

	function addModalClose() {
		setAddModalShow(false);
	}

	function editModalClose() {
		setEditModalShow(false);
	}

	async function deleteEmp(empId) {
		if (window.confirm('Are you confirm to delete?')) {
			await DELETE_EMPLOYEE(empId);
			reloadPage();
		}
	}

	function reloadPage() {
		setReload(reload + 1);
	}

	return (
		<div >
			<Table className="mt-4" striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Department</th>
						<th>DateOfJoining</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{emps.map(emp =>
						<tr key={emp.Id}>
							<td>{emp.Id}</td>
							<td>{emp.Name}</td>
							<td>{emp.Department}</td>
							<td>{emp.DateOfJoining}</td>
							<td>
								<ButtonToolbar>
									<Button className="mr-2" variant="info"
										onClick={() => {
											setEditModalShow(true);
											setCurrentEmp({
												Id: emp.Id,
												Name: emp.Name,
												Department: emp.Department,
												DateOfJoining: emp.DateOfJoining,
												PhotoURL: emp.PhotoURL
											});
										}}>
										Edit
									</Button>

									<Button className="mr-2" variant="danger"
										onClick={() => deleteEmp(emp.Id)}>
										Delete
									</Button>

									<EditEmpModal show={editModalShow}
										onHide={editModalClose}
										currentEmp={currentEmp}
										onReload={reloadPage} />
								</ButtonToolbar>
							</td>
						</tr>)}
				</tbody>
			</Table>

			<ButtonToolbar>
				<Button variant='primary'
					onClick={() => setAddModalShow(true)}>
					Add Employee
				</Button>

				<AddEmpModal show={addModalShow}
					onHide={addModalClose}
					onReload={reloadPage} />
			</ButtonToolbar>
		</div>
	)
}

export default Employee;

