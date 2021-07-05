import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Image, Container } from 'react-bootstrap';
import { formatDateForBE, formatDateForFE } from '../../extension';
import { GetDeps } from '../../redux/slices/departmentSlice';
import { UpdateEmps } from '../../redux/slices/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

function EditEmpModal(props) {
	const { onHide, onReload, currentEmp } = props;
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetDeps());
	}, [dispatch]);

	async function handleSubmit(e) {
		e.preventDefault();
		const employee = {
			id: e.target.Id.value,
			Name: e.target.Name.value,
			DepartmentId: e.target.Department.value,
			DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
			PhotoURL: e.target.PhotoURL.value
		};
		await dispatch(UpdateEmps(employee));
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
						Edit Employee
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>

								<Form.Group controlId="Id">
									<Form.Label>Id</Form.Label>
									<Form.Control type="text" name="Id" required
										readOnly
										defaultValue={currentEmp.Id}
										placeholder="Employee Id" />
								</Form.Group>

								<Form.Group controlId="Name">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="Name" required
										defaultValue={currentEmp.Name}
										placeholder="Department Name" />
								</Form.Group>

								<Form.Group controlId="Department">
									<Form.Label>Department</Form.Label>
									<Form.Control
										name="Department"
										as="select"
										defaultValue={currentEmp.Department}>
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
										defaultValue={formatDateForFE(currentEmp.DateOfJoining)}
										placeholder="DateOfJoining"
									/>
								</Form.Group>

								<Form.Group controlId="PhotoURL">
									<Form.Label>PhotoURL</Form.Label>
									<Form.Control type="text" name="PhotoURL"
										required
										defaultValue={currentEmp.PhotoURL}
										placeholder="PhotoURL" />
								</Form.Group>

								<hr style={{ width: '225%' }} />
								<Form.Group>
									<Button variant="primary" type="submit">
										Update Employee
									</Button>
								</Form.Group>
							</Form>
						</Col>

						<Col sm={6}>
							<Image width="200px" height="200px"
								src={currentEmp.PhotoURL} />
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

EditEmpModal.propTypes = {
	currentEmp: PropTypes.object,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default EditEmpModal;

