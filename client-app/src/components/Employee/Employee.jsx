import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';
import { useSelector, useDispatch } from 'react-redux';
import { GetEmps, DeleteEmps } from '../../redux/slices/employeeSlice';

function Employee() {
	const emps = useSelector(state => state.employee);
	const dispatch = useDispatch();

	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [reload, setReload] = useState(false);
	const [currentEmp, setCurrentEmp] = useState({
		Id: 0, Name: "", Department: "",
		DateOfJoining: "", PhotoURL: ""
	});

	useEffect(() => {
		dispatch(GetEmps());
	}, [reload, dispatch]);

	const addModalClose = () => setAddModalShow(false);

	const editModalClose = () => setEditModalShow(false);

	const deleteEmp = async (empId) => {
		if (window.confirm('Are you confirm to delete?')) {
			await dispatch(DeleteEmps(empId));
			reloadPage();
		}
	}

	const reloadPage = () => setReload(!reload);

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

									<EditEmpModal
										show={editModalShow}
										onHide={editModalClose}
										onReload={reloadPage}
										currentEmp={currentEmp} />
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

