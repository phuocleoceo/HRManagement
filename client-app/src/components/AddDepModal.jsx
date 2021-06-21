import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { POST_DEPARTMENT } from '../api/apiService';

function AddDepModal(props) {
	const { onHide } = props;
	async function handleSubmit(e) {
		try {
			e.preventDefault();
			let department = {
				Name: e.target.Name.value
			};
			let result = await POST_DEPARTMENT(department);
			if (result.status === 201) {
				alert("Add Department Success !");
			}
		}
		catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header clooseButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Department
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="DepartmentName">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="Name" required
										placeholder="Department Name" />
								</Form.Group>

								<Form.Group>
									<Button variant="primary" type="submit">
										Add Department
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

AddDepModal.propTypes = {
	onHide: PropTypes.func
}

export default AddDepModal;

