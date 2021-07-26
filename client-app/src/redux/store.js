import { configureStore } from '@reduxjs/toolkit';
import departmentSlice from './slices/departmentSlice';
import employeeSlice from './slices/employeeSlice';
import authenticationSlice from './slices/authenticationSlice';

export const store = configureStore({
	reducer: {
		department: departmentSlice,
		employee: employeeSlice,
		authentication: authenticationSlice
	},
});