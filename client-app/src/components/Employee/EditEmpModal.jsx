import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { formatDateForBE, formatDateForFE } from '../../extension/FormatDate';
import { PHOTO_PATH_URL } from '../../extension/AppURL';
import { EditEmps, SavePhotoFile } from '../../redux/slices/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function EditEmpModal(props) {
	const { show, onHide, onReload, currentEmp } = props;
	const deps = useSelector(state => state.department);
	const dispatch = useDispatch();
	const [image, setImage] = useState("");

	useEffect(() => {
		setImage(PHOTO_PATH_URL + currentEmp.PhotoURL);
	}, [dispatch, currentEmp]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const photo = e.target.PhotoURL.files[0];
		const employee = {
			id: e.target.Id.value,
			Name: e.target.Name.value,
			DepartmentId: e.target.Department.value,
			DateOfJoining: formatDateForBE(e.target.DateOfJoining.value),
			PhotoURL: photo ? photo.name : currentEmp.PhotoURL
		};
		const check = await dispatch(EditEmps(employee));
		if (check.payload) {
			toast.success("Edit Employee Successfully !");
		}
		else {
			toast.error("Edit Employee Failure !");
		}
		onHide();
		onReload();
		//photo undefined when It's current Photo loaded by URL
		if (photo) await savePhoto(photo);
	};

	const savePhoto = async (photo) => {
		const formData = new FormData();
		formData.append("myFile", photo, photo.name);
		await dispatch(SavePhotoFile(formData));
	}

	const handleFileSelected = (e) => {
		e.preventDefault();
		setImage(URL.createObjectURL(e.target.files[0]));
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>
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
									defaultValue={currentEmp.DepartmentId}>
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
						</Col>
						<Col sm={6}>
							<Image src={image} width="200vw" height="auto" />
							<p></p>
							<Form.Group controlId="PhotoURL" className="mb-3">
								<Form.Control name="PhotoURL" type="file"
									onChange={handleFileSelected} />
							</Form.Group>
						</Col>
					</Row>

					<hr style={{ width: '225%' }} />
					<Form.Group>
						<Button variant="primary" type="submit" className="mr-2">
							Update Employee
						</Button>
						<Button variant="danger" onClick={onHide} className="mr-2">
							Close
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

EditEmpModal.propTypes = {
	show: PropTypes.bool,
	currentEmp: PropTypes.object,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default EditEmpModal;

