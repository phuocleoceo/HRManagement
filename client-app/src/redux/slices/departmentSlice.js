import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_DEPARTMENT } from '../../api/apiDepartment';

export const GetDeps = createAsyncThunk(
	"department/GetDeps",
	async () => {
		const response = await GET_DEPARTMENT();
		return response.data;
	});

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