import { GET_DEPARTMENT, POST_DEPARTMENT, PUT_DEPARTMENT, DELETE_DEPARTMENT } from '../../api/apiDepartment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetDeps = createAsyncThunk(
	"department/GetDeps",
	async () => {
		try {
			const response = await GET_DEPARTMENT();
			return response.data;
		}
		catch {
			return [];
		}
	}
);

export const AddDeps = createAsyncThunk(
	"department/AddDeps",
	async (dep) => {
		try {
			const response = await POST_DEPARTMENT(dep);
			if (response.status === 201) return true;
			return false;
		}
		catch {
			return false;
		}
	}
);

export const EditDeps = createAsyncThunk(
	"department/EditDeps",
	async (dep) => {
		try {
			const response = await PUT_DEPARTMENT(dep.id, dep);
			if (response.status === 204) return true;
			return false;
		}
		catch {
			return false;
		}
	}
);

export const DeleteDeps = createAsyncThunk(
	"department/DeleteDeps",
	async (id) => {
		try {
			const response = await DELETE_DEPARTMENT(id);
			if (response.status === 204) return true;
			return false;
		}
		catch {
			return true;
		}
	}
);

export const departmentSlice = createSlice({
	name: 'department',
	initialState: [],
	reducers: {},
	extraReducers: {
		[GetDeps.fulfilled]: (state, action) => {
			return action.payload;
		}
	}
})

//export const { } = departmentSlice.actions

export default departmentSlice.reducer