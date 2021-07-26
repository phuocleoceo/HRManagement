import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RegisterAction } from '../../redux/slices/authenticationSlice';

export default function Register() {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleRegister = async (e) => {
		e.preventDefault();
		const infor = {
			firstname: e.target.firstname.value,
			lastname: e.target.lastname.value,
			userName: e.target.userName.value,
			password: e.target.password.value,
			email: e.target.email.value,
			phoneNumber: e.target.phoneNumber.value,
			role: "Administrator"
		};
		const check = await dispatch(RegisterAction(infor));
		if (check.payload) {
			toast.success("Register Successfully");
			history.push("/login");
		}
		else {
			toast.error("Register Failure");
		}
	}

	return (
		<Form style={{ maxWidth: '50%' }} onSubmit={handleRegister}>
			<h3>Register</h3>
			<Form.Group controlId="firstname">
				<Form.Label>Firstname</Form.Label>
				<Form.Control type="text" name="firstname" placeholder="Enter firstname" />
			</Form.Group>

			<Form.Group controlId="lastname">
				<Form.Label>Lastname</Form.Label>
				<Form.Control type="text" name="lastname" placeholder="Enter lastname" />
			</Form.Group>

			<Form.Group controlId="userName">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" name="userName" placeholder="Enter username" />
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" name="password" placeholder="Enter Password" />
				<Form.Text className="text-muted">
					Never share your password with anyone else !
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" name="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="phoneNumber">
				<Form.Label>Phone number</Form.Label>
				<Form.Control type="tel" name="phoneNumber" placeholder="Enter phone number" />
			</Form.Group>

			<Button variant="primary" type="submit">
				Register
			</Button>
		</Form>
	)
}
