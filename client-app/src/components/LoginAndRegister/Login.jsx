import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
	return (
		<Form style={{ maxWidth: '50%' }}>
			<h3>Login</h3>
			<Form.Group controlId="username">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" name="username" placeholder="Enter username" />
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
