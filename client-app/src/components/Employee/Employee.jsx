import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';
import { useSelector, useDispatch } from 'react-redux';
import { GetEmps, DeleteEmps } from '../../redux/slices/employeeSlice';
import { setCurrentEmp } from '../../redux/slices/currentEmpSlice';

function Employee() {
	const emps = useSelector(state => state.employee);
	const dispatch = useDispatch();

	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		dispatch(GetEmps());
	}, [reload, dispatch]);

	function addModalClose() {
		setAddModalShow(false);
	}

	function editModalClose() {
		setEditModalShow(false);
	}

	async function deleteEmp(empId) {
		if (window.confirm('Are you confirm to delete?')) {
			await dispatch(DeleteEmps(empId));
			reloadPage();
		}
	}

	function reloadPage() {
		setReload(!reload);
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
											dispatch(setCurrentEmp({
												Id: emp.Id,
												Name: emp.Name,
												Department: emp.Department,
												DateOfJoining: emp.DateOfJoining,
												PhotoURL: emp.PhotoURL
											}));
										}}>
										Edit
									</Button>

									<Button className="mr-2" variant="danger"
										onClick={() => deleteEmp(emp.Id)}>
										Delete
									</Button>

									<EditEmpModal
										show={editModalShow}
										onHide={editModalClose}
										onReload={reloadPage} />
								</ButtonToolbar>
							</td>
						</tr>)
					}
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

