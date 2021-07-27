import React from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { EditDeps } from '../../redux/slices/departmentSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function EditDepModal(props) {
	const { onHide, onReload, currentDep } = props;
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const department = {
			id: e.target.Id.value,
			Name: e.target.Name.value
		};
		const check = await dispatch(EditDeps(department));
		if (check.payload) {
			toast.success("Edit Department Successfully !");
		}
		else {
			toast.error("Edit Department Failure !");
		}
		onHide();
		onReload();
	};

	return (
		<Container>
			<Modal {...props} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						Edit Department
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={7}>
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
									&nbsp;
									<Button variant="danger" onClick={onHide}>
										Close
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

EditDepModal.propTypes = {
	currentDep: PropTypes.object,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default EditDepModal;

