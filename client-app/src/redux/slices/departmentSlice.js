import { GET_DEPARTMENT, POST_DEPARTMENT, PUT_DEPARTMENT, DELETE_DEPARTMENT } from '../../api/apiDepartment';
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

export const AddDeps = createAsyncThunk(
	"department/AddDeps",
	async (dep) => {
		try {
			const response = await POST_DEPARTMENT(dep);
			return response.status === 201;
		}
		catch { return false; }
	}
);

export const EditDeps = createAsyncThunk(
	"department/EditDeps",
	async (dep) => {
		try {
			const response = await PUT_DEPARTMENT(dep.id, dep);
			return response.status === 204;
		}
		catch { return false; }
	}
);

export const DeleteDeps = createAsyncThunk(
	"department/DeleteDeps",
	async (id) => {
		try {
			const response = await DELETE_DEPARTMENT(id);
			return response.status === 204;
		}
		catch { return false; }
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