import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../redux/slices/authenticationSlice';

export default function Navigation() {
	const isLoggedIn = useSelector(state => state.authentication);
	const dispatch = useDispatch();
	const handleLogout = () => dispatch(Logout());

	return (
		<Navbar bg="dark" expand="lg">
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">

					<NavLink className="d-inline p-2 bg-dark text-white" to="/">
						Home
					</NavLink>
					{isLoggedIn &&
						<>
							<NavLink className="d-inline p-2 bg-dark text-white" to="/department">
								Department
							</NavLink>
							<NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
								Employee
							</NavLink>
						</>
					}
				</Nav>

				{isLoggedIn &&
					<Nav>
						<NavLink onClick={handleLogout} className="d-inline p-2 bg-dark text-white" to="/">
							Logout
						</NavLink>
					</Nav>
				}

				{!isLoggedIn &&
					<Nav>
						<NavLink className="d-inline p-2 bg-dark text-white" to="/register">
							Register
						</NavLink>

						<NavLink className="d-inline p-2 bg-dark text-white" to="/login">
							Login
						</NavLink>
					</Nav>
				}

			</Navbar.Collapse>
		</Navbar >
	)
}