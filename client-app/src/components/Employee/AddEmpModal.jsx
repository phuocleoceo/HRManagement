import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GET_DEPARTMENT } from '../../api/apiDepartment';
import { POST_EMPLOYEE } from '../../api/apiEmployee';
import { formatDateForBE } from '../../extension';

function AddEmpModal(props) {
	const { onHide, onReload } = props;
	const [deps, setDeps] = useState([]);

	useEffect(() => {
		async function loadDepartment() {
			const list = await GET_DEPARTMENT();
			setDeps(list.data);
		};
		loadDepartment();
	}, []);

	async function handleSubmit(e) {
		try {
			e.preventDefault();
			const employee = {
				Name: e.target.Name.value,
				DepartmentId: e.target.Department.value,
				DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
				PhotoURL: e.target.PhotoURL.value
			};
			const result = await POST_EMPLOYEE(employee);
			if (result.status === 201) {
				alert("Add Employee Success !");
			}
			onHide();
			onReload();
		}
		catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<Modal
				{...props}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header clooseButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Employee
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="Name">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="Name" required
										placeholder="Employee Name" />
								</Form.Group>

								<Form.Group controlId="Department">
									<Form.Label>Department</Form.Label>
									<Form.Control name="Department" as="select">
										{deps.map(dep =>
											<option key={dep.Id} value={dep.Id}>
												{dep.Name}
											</option>)
										}
									</Form.Control>
								</Form.Group>

								<Form.Group controlId="DateOfJoining">
									<Form.Label>DateOfJoining</Form.Label>
									<Form.Control
										type="date"
										name="DateOfJoining"
										required
										placeholder="DateOfJoining"
									/>
								</Form.Group>

								<Form.Group controlId="PhotoURL">
									<Form.Label>PhotoURL</Form.Label>
									<Form.Control type="text" name="PhotoURL" required
										placeholder="PhotoURL" />
								</Form.Group>

								<hr style={{ width: '225%' }} />
								<Form.Group>
									<Button variant="primary" type="submit">
										Add Department
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

AddEmpModal.propTypes = {
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default AddEmpModal;

