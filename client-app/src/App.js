import Home from './components/Home';
import Department from './components/Department/Department';
import Employee from './components/Employee/Employee';
import Navigation from './components/Navigation';
import Login from './components/LoginAndRegister/Login';
import Register from './components/LoginAndRegister/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
            <Route path='/department' component={Department} />
            <Route path='/employee' component={Employee} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
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
