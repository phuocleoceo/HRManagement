import { configureStore } from '@reduxjs/toolkit';
import departmentSlice from './slices/departmentSlice';
import employeeSlice from './slices/employeeSlice';
import currentEmpSlice from './slices/currentEmpSlice';

export const store = configureStore({
	reducer: {
		department: departmentSlice,
		employee: employeeSlice,
		currentEmp: currentEmpSlice
	},
});