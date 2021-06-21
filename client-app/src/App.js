import Home from './components/Home';
import Department from './components/Department/Department';
import Employee from './components/Employee/Employee';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          HRManagement
        </h3>

        <Navigation />

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
