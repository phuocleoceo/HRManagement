import { combineReducers } from "redux";
import authenticationReducer from './authenticationReducer';
import employeeReducer from './employeeReducer';
import departmentReducer from './departmentReducer';

const rootReducer = combineReducers({
	authentication: authenticationReducer,
	employee: employeeReducer,
	department: departmentReducer
});

export default rootReducer;