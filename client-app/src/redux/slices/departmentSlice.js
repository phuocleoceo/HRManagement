import { GET_DEPARTMENT, GET_DEPARTMENT_BY_ID, POST_DEPARTMENT, PUT_DEPARTMENT, DELETE_DEPARTMENT } from '../../api/apiDepartment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetDeps = createAsyncThunk(
	"department/GetDeps",
	async () => {
		try {
			const response = await GET_DEPARTMENT();
			return response.data;
		}
		catch { return []; }
	}
);

export const GetDepById = createAsyncThunk(
	"department/GetDepById",
	async (id) => {
		const response = await GET_DEPARTMENT_BY_ID(id);
		return response.data;
	}
);

export const AddDeps = createAsyncThunk(
	"department/AddDeps",
	async (dep) => {
		const response = await POST_DEPARTMENT(dep);
		return response.status === 201;
	}
);

export const EditDeps = createAsyncThunk(
	"department/EditDeps",
	async (dep) => {
		const response = await PUT_DEPARTMENT(dep.id, dep);
		return response.status === 204;
	}
);

export const DeleteDeps = createAsyncThunk(
	"department/DeleteDeps",
	async (id) => {
		const response = await DELETE_DEPARTMENT(id);
		return response.status === 204;
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