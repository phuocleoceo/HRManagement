import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PUT_EMPLOYEE, GET_DEPARTMENT } from '../../api/apiService';

function EditEmpModal(props) {
	const { onHide, onReload, currentEmp } = props;
	const [deps, setDeps] = useState([]);

	useEffect(() => {
		async function loadDepartment() {
			const list = await GET_DEPARTMENT();
			setDeps(list.data);
		};
		loadDepartment();
	}, []);

	function formatDate(date) {
		// yyyy-mm-dd => dd/mm/yyyy
		var dateArray = date.split("-");
		return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
	}

	async function handleSubmit(e) {
		try {
			e.preventDefault();
			const id = e.target.Id.value;
			const employee = {
				Name: e.target.Name.value,
				DepartmentId: e.target.Department.value,
				DateOfJoining: formatDate(e.target.DateOfJoining.value),
				PhotoURL: e.target.PhotoURL.value
			};
			const result = await PUT_EMPLOYEE(id, employee);
			if (result.status === 204) {
				alert("Edit Employee Success !");
			}
			onHide();
			onReload();
		}
		catch (err) {
			console.log(err);
		}
	};

	return (
		<div>

		</div>
	)
}

EditEmpModal.propTypes = {
	currentEmp: PropTypes.object,
	onHide: PropTypes.func,
	onReload: PropTypes.func
}

export default EditEmpModal;

