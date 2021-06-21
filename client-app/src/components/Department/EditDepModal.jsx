import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PUT_DEPARTMENT } from '../../api/apiService';

function EditDepModal(props) {
	const { onHide, onReload, currentDep } = props;
	async function handleSubmit(e) {
		try {
			e.preventDefault();
			const id = e.target.Id.value;
			const department = {
				Name: e.target.Name.value
			};
			const result = await PUT_DEPARTMENT(id, department);
			if (result.status === 204) {
				alert("Edit Department Success !");
			}
			onHide();
			onReload();
		}
		catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<Modal
				{...props}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header clooseButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit Department
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>

								<Form.Group controlId="DepartmentId">
									<Form.Label>Id</Form.Label>
									<Form.Control type="text" name="Id" required
										readOnly
										defaultValue={currentDep.Id}
										placeholder="Department Id" />
								</Form.Group>

								<Form.Group controlId="DepartmentName">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="Name" required
										defaultValue={currentDep.Name}
										placeholder="Department Name" />
								</Form.Group>

								<hr style={{ width: '225%' }} />
								<Form.Group>
									<Button variant="primary" type="submit">
										Update Department
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</div>
	)
}

EditDepModal.propTypes = {
	currentDep: PropTypes.object,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default EditDepModal;

