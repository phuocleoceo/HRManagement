import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';
import { useSelector, useDispatch } from 'react-redux';
import { GetDeps, DeleteDeps } from '../../redux/slices/departmentSlice';
import { toast } from 'react-toastify';


function Department() {
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [reload, setReload] = useState(false);
	const [currentDep, setCurrentDep] = useState({ Id: 0, Name: "" });

	useEffect(() => {
		dispatch(GetDeps());
	}, [reload, dispatch]);

	const handleEditDep = async (dep) => {
		setCurrentDep(dep);
		setEditModalShow(true);
	}

	const handleDeleteDep = async (depId) => {
		if (window.confirm('Are you confirm to delete?')) {
			const check = await dispatch(DeleteDeps(depId));
			if (check.payload) {
				toast.success("Delete Department Successfully !");
			}
			else {
				toast.error("Delete Department Failure !");
			}
			reloadPage();
		}
	}

	const addModalClose = () => setAddModalShow(false);

	const editModalClose = () => setEditModalShow(false);

	const reloadPage = () => setReload(!reload);

	return (
		<>
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
							<td>
								<Button className="mr-2" variant="info"
									onClick={() => handleEditDep(dep)}>
									Edit
								</Button>

								<Button className="mr-2" variant="danger"
									onClick={() => handleDeleteDep(dep.Id)}>
									Delete
								</Button>
							</td>
						</tr>)
					}
				</tbody>
			</Table>

			<Button variant="primary"
				onClick={() => setAddModalShow(true)}>
				Add Department
			</Button>

			<AddDepModal show={addModalShow}
				onHide={addModalClose}
				onReload={reloadPage} />

			<EditDepModal show={editModalShow}
				onHide={editModalClose}
				currentDep={currentDep}
				onReload={reloadPage} />
		</>
	)
}

export default Department;

