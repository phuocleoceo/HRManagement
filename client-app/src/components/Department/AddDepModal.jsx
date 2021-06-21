import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { POST_DEPARTMENT } from '../../api/apiService';

function AddDepModal(props) {
	const { onHide, onReload } = props;
	async function handleSubmit(e) {
		try {
			e.preventDefault();
			const department = {
				Name: e.target.Name.value
			};
			const result = await POST_DEPARTMENT(department);
			if (result.status === 201) {
				alert("Add Department Success !");
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
						Add Department
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="Name">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="Name" required
										placeholder="Department Name" />
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
		</div>
	)
}

AddDepModal.propTypes = {
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default AddDepModal;

