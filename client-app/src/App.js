import React, { useEffect } from 'react';
import Home from './components/Home';
import Department from './components/Department/Department';
import Employee from './components/Employee/Employee';
import Navigation from './components/Navigation';
import Login from './components/LoginAndRegister/Login';
import Register from './components/LoginAndRegister/Register';
import AccessDenied from './components/InvalidPath/AccessDenied';
import NotFound from './components/InvalidPath/NotFound';
import { CheckLoggedin } from './redux/slices/authenticationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function App() {
	const isLoggedIn = useSelector(state => state.authentication);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CheckLoggedin());
	}, [dispatch]);

	return (
		<>
			<BrowserRouter>
				<Container>
					<h3 className="m-3 d-flex justify-content-center">
						HRManagement
					</h3>

					<Navigation />

					<Switch>
						<Route path='/' component={Home} exact />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						{
							isLoggedIn ?
								<>
									<Route path='/department' component={Department} />
									<Route path='/employee' component={Employee} />
								</>
								:
								<Route path={['/department', '/employee']}
									component={AccessDenied} />
						}
						<Route component={NotFound} />
					</Switch>
				</Container>
			</BrowserRouter>

			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
