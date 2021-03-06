import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AddDeps } from '../../redux/slices/departmentSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function AddDepModal(props) {
	const { show, onHide, onReload } = props;
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const department = {
			Name: e.target.Name.value
		};
		const check = await dispatch(AddDeps(department));
		if (check.payload) {
			toast.success("Add Department Successfully !");
		}
		else {
			toast.error("Add Department Failure !");
		}
		onHide();
		onReload();
	};

	return (
		<Modal show={show} onHide={onHide} size="sm" centered>
			<Modal.Header closeButton>
				<Modal.Title>
					Add Department
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="Name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" name="Name" required
							placeholder="Department Name" />
					</Form.Group>

					<hr style={{ width: '225%' }} />
					<Form.Group>
						<Button variant="primary" type="submit" className="mr-2">
							Add Department
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

AddDepModal.propTypes = {
	show: PropTypes.bool,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default AddDepModal;

