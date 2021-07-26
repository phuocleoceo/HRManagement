import { GET_EMPLOYEE, POST_EMPLOYEE, PUT_EMPLOYEE, DELETE_EMPLOYEE, SAVE_PHOTO } from '../../api/apiEmployee';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
			if (response.status === 201) return true;
			else return false;
		}
		catch {
			return false;
		}
	}
);

export const EditEmps = createAsyncThunk(
	"employee/EditEmps",
	async (emp) => {
		try {
			const response = await PUT_EMPLOYEE(emp.id, emp);
			if (response.status === 204) return true;
			return false;
		}
		catch {
			return false;
		}
	}
);

export const DeleteEmps = createAsyncThunk(
	"employee/DeleteEmps",
	async (id) => {
		try {
			const response = await DELETE_EMPLOYEE(id);
			if (response.status === 204) return true;
			return false;
		}
		catch {
			return false;
		}
	}
);

export const SavePhotoFile = createAsyncThunk(
	"employee/SavePhotoFile",
	async (body) => {
		try {
			const response = await SAVE_PHOTO(body);
			if (response.status === 200) return true;
			return false;
		}
		catch {
			return false;
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