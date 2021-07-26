import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginAction } from '../../redux/slices/authenticationSlice';

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogin = async (e) => {
		e.preventDefault();
		const infor = {
			userName: e.target.userName.value,
			password: e.target.password.value
		};
		const check = await dispatch(LoginAction(infor));
		if (check.payload.Accepted) {
			toast.success("Login Successfully");
			history.push("/");
		}
		else {
			toast.error("Login Failure");
		}
	}

	return (
		<Form style={{ maxWidth: '50%' }} onSubmit={handleLogin}>
			<h3>Login</h3>
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
			<Button variant="primary" type="submit">
				Login
			</Button>
		</Form>
	)
}
