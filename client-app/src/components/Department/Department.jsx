import React, { useState, useEffect } from 'react';
import { GET_DEPARTMENT, DELETE_DEPARTMENT } from '../../api/apiDepartment';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';
import { toast } from 'react-toastify';

function Department() {
	const [deps, setDeps] = useState([]);
	const [addModalShow, setAddModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [currentDep, setCurrentDep] = useState({ Id: 0, Name: "" });
	const [reload, setReload] = useState(0);

	useEffect(() => {
		async function refreshList() {
			const list = await GET_DEPARTMENT();
			setDeps(list.data);
		};
		refreshList();
	}, [reload]);

	function addModalClose() {
		setAddModalShow(false);
	}

	function editModalClose() {
		setEditModalShow(false);
	}

	async function deleteDep(depId) {
		if (window.confirm('Are you confirm to delete?')) {
			try {
				await DELETE_DEPARTMENT(depId);
				toast.success("Delete Department Successfully !");
				reloadPage();
			}
			catch (err) {
				toast.error(err);
			}
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
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{deps.map(dep =>
						<tr key={dep.Id}>
							<td>{dep.Id}</td>
							<td>{dep.Name}</td>
							<td>
								<ButtonToolbar>
									<Button className="mr-2" variant="info"
										onClick={() => {
											setEditModalShow(true);
											setCurrentDep({
												Id: dep.Id,
												Name: dep.Name
											});
										}}>
										Edit
									</Button>

									<Button className="mr-2" variant="danger"
										onClick={() => deleteDep(dep.Id)}>
										Delete
									</Button>

									<EditDepModal show={editModalShow}
										onHide={editModalClose}
										currentDep={currentDep}
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
					Add Department
				</Button>

				<AddDepModal show={addModalShow}
					onHide={addModalClose}
					onReload={reloadPage} />
			</ButtonToolbar>
		</div>
	)
}

export default Department;

