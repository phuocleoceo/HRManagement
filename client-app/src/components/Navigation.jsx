import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { LOGOUT } from '../api/apiAuthentication';

export default function Navigation() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const hrm_user = localStorage.getItem("hrm_user");
        if (!hrm_user) {
            setLoggedIn(false);
        }
        else {
            setLoggedIn(true);
        }
    }, [])

    function handleLogout() {
        LOGOUT();
        window.location.href = "/";
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
                    </NavLink>
                    {loggedIn &&
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

                {loggedIn &&
                    <Nav>
                        <NavLink onClick={handleLogout} className="d-inline p-2 bg-dark text-white" to="/">
                            Logout
                        </NavLink>
                    </Nav>
                }

                {!loggedIn &&
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