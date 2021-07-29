import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';
import { useSelector, useDispatch } from 'react-redux';
import { GetEmps, DeleteEmps } from '../../redux/slices/employeeSlice';
import { toast } from 'react-toastify';

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
			const check = await dispatch(DeleteEmps(empId));
			if (check.payload) {
				toast.success("Delete Employee Successfully !");
			}
			else {
				toast.error("Delete Employee Fail");
			}
			reloadPage();
		}
	}

	const reloadPage = () => setReload(!reload);

	return (
		<>
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
								</ButtonToolbar>
							</td>
						</tr>)
					}
				</tbody>
			</Table>

			<Button variant="primary"
				onClick={() => setAddModalShow(true)}>
				Add Employee
			</Button>

			<AddEmpModal show={addModalShow}
				onHide={addModalClose}
				onReload={reloadPage} />

			<EditEmpModal
				show={editModalShow}
				onHide={editModalClose}
				onReload={reloadPage}
				currentEmp={currentEmp} />
		</>
	)
}

export default Employee;

