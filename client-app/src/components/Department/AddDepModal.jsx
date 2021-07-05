import React from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { CreateDeps } from '../../redux/slices/departmentSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

function AddDepModal(props) {
	const { onHide, onReload } = props;
	const dispatch = useDispatch();
	async function handleSubmit(e) {
		e.preventDefault();
		const department = {
			Name: e.target.Name.value
		};
		await dispatch(CreateDeps(department));
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
		</Container>
	)
}

AddDepModal.propTypes = {
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default AddDepModal;

