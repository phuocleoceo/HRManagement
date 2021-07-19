import { configureStore } from '@reduxjs/toolkit';
import departmentSlice from './slices/departmentSlice';
import employeeSlice from './slices/employeeSlice';
import photoSlice from './slices/photoSlice';

export const store = configureStore({
	reducer: {
		department: departmentSlice,
		employee: employeeSlice,
		photo: photoSlice
	},
});