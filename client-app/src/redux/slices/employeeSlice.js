import { GET_EMPLOYEE, POST_EMPLOYEE, PUT_EMPLOYEE, DELETE_EMPLOYEE } from '../../api/apiEmployee';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const GetEmps = createAsyncThunk(
	"employee/GetEmps",
	async () => {
		try {
			const response = await GET_EMPLOYEE();
			return response.data;
		}
		catch {
			return [];
		}
	}
);

export const AddEmps = createAsyncThunk(
	"employee/AddEmps",
	async (emp) => {
		try {
			const response = await POST_EMPLOYEE(emp);
			if (response.status === 201) {
				toast.success("Add Employee Successfully !");
			}
		}
		catch {
			toast.error("Add Employee Fail");
		}
	}
);

export const EditEmps = createAsyncThunk(
	"employee/EditEmps",
	async (emp) => {
		try {
			const response = await PUT_EMPLOYEE(emp.id, emp);
			if (response.status === 204) {
				toast.success("Edit Employee Successfully !");
			}
		}
		catch {
			toast.error("Edit Employee Fail");
		}
	}
);

export const DeleteEmps = createAsyncThunk(
	"employee/DeleteEmps",
	async (id) => {
		try {
			const response = await DELETE_EMPLOYEE(id);
			if (response.status === 204) {
				toast.success("Delete Employee Successfully !");
			}
		}
		catch {
			toast.error("Delete Employee Fail");
		}
	}
);

export const employeeSlice = createSlice({
	name: 'employee',
	initialState: [],
	reducers: {},
	extraReducers: {
		[GetEmps.fulfilled]: (state, action) => {
			return action.payload;
		}
	}
})

//export const { } = employeeSlice.actions

export default employeeSlice.reducer