import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Image, Container } from 'react-bootstrap';
import { formatDateForBE, formatDateForFE, PHOTO_PATH_URL } from '../../extension';
import { EditEmps } from '../../redux/slices/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { SAVE_PHOTO } from '../../api/apiEmployee';
import PropTypes from 'prop-types';

function EditEmpModal(props) {
	const { onHide, onReload, currentEmp } = props;
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();
	const [image, setImage] = useState("");

	useEffect(() => {
		setImage(PHOTO_PATH_URL + currentEmp.PhotoURL);
	}, [dispatch, currentEmp]);

	async function handleSubmit(e) {
		e.preventDefault();
		const employee = {
			id: e.target.Id.value,
			Name: e.target.Name.value,
			DepartmentId: e.target.Department.value,
			DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
			PhotoURL: e.target.PhotoURL.files[0].name
		};
		await dispatch(EditEmps(employee));
		const formData = new FormData();
		formData.append(
			"myFile",
			e.target.PhotoURL.files[0],
			e.target.PhotoURL.files[0].name
		);
		await SAVE_PHOTO(formData);
		onHide();
		onReload();
	};

	const handleFileSelected = (e) => {
		e.preventDefault();
		setImage(URL.createObjectURL(e.target.files[0]));
	}

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
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
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

								<hr style={{ width: '225%' }} />
								<Form.Group>
									<Button variant="primary" type="submit">
										Update Employee
									</Button>
									&nbsp;
									<Button variant="danger" onClick={onHide}>
										Close
									</Button>
								</Form.Group>
							</Col>

							<Col sm={6}>
								<Image src={image}
									width="200px" height="200px" />
								<p></p>
								<Form.Group controlId="PhotoURL" className="mb-3">
									<Form.Control name="PhotoURL" type="file"
										onChange={handleFileSelected} />
								</Form.Group>
							</Col>
						</Row>
					</Form>
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

