import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Container, Image } from 'react-bootstrap';
import { GetDeps } from '../../redux/slices/departmentSlice';
import { AddEmps } from '../../redux/slices/employeeSlice';
import { SAVE_PHOTO } from '../../api/apiEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateForBE } from '../../extension';
import PropTypes from 'prop-types';

function AddEmpModal(props) {
	const { onHide, onReload } = props;
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();
	const [file, setFile] = useState(null);

	useEffect(() => {
		dispatch(GetDeps());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const employee = {
			Name: e.target.Name.value,
			DepartmentId: e.target.Department.value,
			DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
			PhotoURL: e.target.PhotoURL.files[0].name
		};
		await dispatch(AddEmps(employee));
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
		setFile(e.target.files[0]);
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
						Add Employee
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
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

								<hr style={{ width: '225%' }} />
								<Form.Group>
									<Button variant="primary" type="submit">
										Add Employee
									</Button>
									&nbsp;
									<Button variant="danger" onClick={onHide}>
										Close
									</Button>
								</Form.Group>
							</Col>

							<Col sm={6}>
								<Image src={file ? URL.createObjectURL(file) : null}
									alt={file ? file.name : null}
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

AddEmpModal.propTypes = {
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default AddEmpModal;

