import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { GetDeps } from '../../redux/slices/departmentSlice';
import { AddEmps } from '../../redux/slices/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateForBE } from '../../extension';
import PropTypes from 'prop-types';

function AddEmpModal(props) {
	const { onHide, onReload } = props;
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetDeps());
	}, [dispatch]);

	async function handleSubmit(e) {
		e.preventDefault();
		const employee = {
			Name: e.target.Name.value,
			DepartmentId: e.target.Department.value,
			DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
			PhotoURL: e.target.PhotoURL.value
		};
		await dispatch(AddEmps(employee));
		onHide();
		onReload();
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
										Add Employee
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

