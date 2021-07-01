import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Register() {
	return (
		<Form style={{ maxWidth: '50%' }}>
			<h3>Register</h3>
			<Form.Group controlId="firstname">
				<Form.Label>Firstname</Form.Label>
				<Form.Control type="text" name="firstname" placeholder="Enter firstname" />
			</Form.Group>

			<Form.Group controlId="lastname">
				<Form.Label>Lastname</Form.Label>
				<Form.Control type="text" name="lastname" placeholder="Enter lastname" />
			</Form.Group>

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

			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" name="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="phonenumber">
				<Form.Label>Phone number</Form.Label>
				<Form.Control type="tel" name="phonenumber" placeholder="Enter phone number" />
			</Form.Group>

			<Button variant="primary" type="submit">
				Register
			</Button>
		</Form>
	)
}
