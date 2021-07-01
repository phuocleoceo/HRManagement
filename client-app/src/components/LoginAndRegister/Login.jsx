import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { LOGIN } from '../../api/apiAuthentication';

export default function Login() {
	async function handleLogin(e) {
		e.preventDefault();
		const infor = {
			userName: e.target.userName.value,
			password: e.target.password.value
		};
		const auth = await LOGIN(infor);
		if (auth) {
			alert("Login Successfully");
		}
		else {
			alert("Login Fail");
		}
		window.location.href = "/";
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
			<p className="forgot-password text-right">
				Forgot <a href="#/">password?</a>
			</p>
		</Form>
	)
}
